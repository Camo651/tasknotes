import { EditorView } from "@codemirror/view";
import { TaskLinkWidget } from "../../../src/editor/TaskLinkWidget";
import { PluginFactory, TaskFactory } from "../../helpers/mock-factories";
import { TaskInfo } from "../../../src/types/TaskInfo";

jest.mock("../../../src/ui/TaskCard", () => ({
	createTaskCard: jest.fn(() => {
		const card = document.createElement("span");
		card.className = "task-card task-card--layout-inline";
		return card;
	}),
}));

jest.mock("../../../src/editor/TaskLinkOverlay", () => ({
	dispatchTaskUpdate: jest.fn(),
}));

describe("TaskLinkWidget mobile input isolation", () => {
	let mockPlugin: ReturnType<typeof PluginFactory.createMockPlugin>;
	let mockTask: TaskInfo;
	let widget: TaskLinkWidget;
	const mockView = { dispatch: jest.fn() } as unknown as EditorView;

	beforeEach(() => {
		jest.clearAllMocks();

		mockTask = TaskFactory.createTask({
			path: "tasks/example-task.md",
			title: "Example Task",
			status: "open",
		});

		mockPlugin = PluginFactory.createMockPlugin({
			settings: {
				inlineVisibleProperties: ["status", "priority", "due"],
			},
		});

		widget = new TaskLinkWidget(mockTask, mockPlugin, "[[tasks/example-task]]");
	});

	it("marks the wrapper as non-editable for CodeMirror and iOS WebKit", () => {
		const wrapper = widget.toDOM(mockView);

		expect(wrapper.getAttribute("contenteditable")).toBe("false");
		expect(wrapper.getAttribute("spellcheck")).toBe("false");
		expect(wrapper.getAttribute("data-widget-type")).toBe("task-link");
		expect(wrapper.classList.contains("tasknotes-inline-widget")).toBe(true);
	});

	it("carries the wrapper class that opts the subtree out of iOS Safari text-selection walks", () => {
		// iOS-Safari perf hints (user-select: none; -webkit-user-modify: read-only)
		// live on .tasknotes-plugin.tasknotes-inline-widget in styles/task-inline-widget.css.
		// We assert the class is present so the CSS rule can attach.
		const wrapper = widget.toDOM(mockView);

		expect(wrapper.classList.contains("tasknotes-plugin")).toBe(true);
		expect(wrapper.classList.contains("tasknotes-inline-widget")).toBe(true);
	});

	it.each([
		"mousedown",
		"click",
		"auxclick",
		"dblclick",
		"contextmenu",
		"pointerdown",
		"pointerup",
		"touchstart",
		"touchend",
	])("ignores %s events from CodeMirror", (eventType) => {
		const event = new Event(eventType);
		expect(widget.ignoreEvent(event)).toBe(true);
	});

	it("does not ignore unrelated events", () => {
		expect(widget.ignoreEvent(new Event("keydown"))).toBe(false);
		expect(widget.ignoreEvent(new Event("focus"))).toBe(false);
	});
});
