/**
 * Temporary vault-file debug logger for diagnosing the iOS Live-Preview freeze.
 *
 * Writes append-only lines to `debug.md` at the vault root. Not intended to ship
 * long-term — this file exists so the reporter can dump logs from an iPhone that
 * we cannot connect to Safari Web Inspector.
 *
 * All logging is buffered in memory and flushed every 250ms so the hot paths we
 * are instrumenting stay synchronous. Flushes are best-effort and swallow errors.
 */
import type { App } from "obsidian";

const DEBUG_FILE = "debug.md";
const FLUSH_INTERVAL_MS = 250;

// Structural subset of Obsidian's DataAdapter. Typed locally so this file does not
// depend on Obsidian type resolution in restricted review-types tsconfigs.
interface MinimalAdapter {
	exists(path: string): Promise<boolean>;
	write(path: string, data: string): Promise<void>;
	append(path: string, data: string): Promise<void>;
}

let adapter: MinimalAdapter | undefined;
let buffer: string[] = [];
let flushTimer: number | null = null;
let counter = 0;
let sessionId = "";
let enabled = false;

function pad(n: number, width: number): string {
	return n.toString().padStart(width, "0");
}

function nowStamp(): string {
	const d = new Date();
	return (
		`${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:` +
		`${pad(d.getSeconds(), 2)}.${pad(d.getMilliseconds(), 3)}`
	);
}

function safeStringify(data: unknown): string {
	try {
		return JSON.stringify(data, (_key, value) => {
			if (value instanceof Error) {
				return { name: value.name, message: value.message };
			}
			if (typeof value === "function") {
				return "[fn]";
			}
			return value;
		});
	} catch {
		return "[unserializable]";
	}
}

async function flush(): Promise<void> {
	if (!enabled || !adapter || buffer.length === 0) {
		return;
	}
	const chunk = buffer.join("");
	buffer = [];
	try {
		const activeAdapter = adapter;
		const exists = await activeAdapter.exists(DEBUG_FILE);
		if (!exists) {
			await activeAdapter.write(DEBUG_FILE, chunk);
		} else {
			await activeAdapter.append(DEBUG_FILE, chunk);
		}
	} catch {
		// Ignore — this is best-effort diagnostic output.
	}
}

export function initDebugLogger(pluginApp: App): void {
	adapter = pluginApp.vault.adapter;
	enabled = true;
	sessionId = Math.random().toString(36).slice(2, 8);
	counter = 0;
	buffer.push(
		`\n\n---\n### session ${sessionId} @ ${new Date().toISOString()}\n\n`
	);
	if (flushTimer === null) {
		flushTimer = window.setInterval(() => {
			void flush();
		}, FLUSH_INTERVAL_MS);
	}
}

export function disposeDebugLogger(): void {
	enabled = false;
	if (flushTimer !== null) {
		window.clearInterval(flushTimer);
		flushTimer = null;
	}
	void flush();
	adapter = undefined;
}

export function dlog(tag: string, message: string, data?: unknown): void {
	if (!enabled) return;
	counter += 1;
	const line =
		data === undefined
			? `- ${nowStamp()} #${counter} [${tag}] ${message}\n`
			: `- ${nowStamp()} #${counter} [${tag}] ${message} ${safeStringify(data)}\n`;
	buffer.push(line);
}
