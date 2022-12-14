import TaskManager from './TaskManager';

describe('taskManager', () => {
	const
		{
			getTask,
			removeTask,
			addTask,
		} = TaskManager;

	const taskList = [
		{ id: 'XYZG', task: 'Debug The Code' },
		{ id: 'KLMN', task: 'Clear The Code' },
	];

	test('get task', () => {
		const idLength = 4;
		const text = expect.any(String);

		const result = getTask(idLength, text);

		expect(result).toEqual({
			id: expect.any(String),
			task: text,
		});
	});

	test('remove task from the list', () => {
		const context = { state: { taskList }, data: { id: 'XYZG' }};

		const result = removeTask(context);

		expect(result).toEqual([taskList[1]]);
	});

	describe('adding task to the taskList', () => {
		test('when the max task is higher', () => {
			const context = {
				state: { taskList },
				config: { idLength: 4, taskMax: 3 },
				data: 'Increase Bandwidth',
			};

			const result = addTask(context);

			expect(result).toEqual([...taskList, {
				id: expect.any(String),
				task: context.data,
			}]);
		});

		test('when the max Task is lesser', () => {
			const context = {
				state: { taskList },
				config: { idLength: 4, taskMax: 2 },
				data: 'Increase Bandwidth',
			};

			const result = addTask(context);

			expect(result).toEqual([...taskList]);
		});
	});
});
