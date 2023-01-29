const timeFrameBtns = document.querySelectorAll('.header-card__button');
const elements = document.querySelectorAll('h3');
const elementNames = [];
const timeSpentPerChosenTimeFrame = [
	{
		title: 'Work',
		timeframes: {
			daily: {
				current: 5,
				previous: 7,
			},
			weekly: {
				current: 32,
				previous: 36,
			},
			monthly: {
				current: 103,
				previous: 128,
			},
		},
	},
	{
		title: 'Play',
		timeframes: {
			daily: {
				current: 1,
				previous: 2,
			},
			weekly: {
				current: 10,
				previous: 8,
			},
			monthly: {
				current: 23,
				previous: 29,
			},
		},
	},
	{
		title: 'Study',
		timeframes: {
			daily: {
				current: 0,
				previous: 1,
			},
			weekly: {
				current: 4,
				previous: 7,
			},
			monthly: {
				current: 13,
				previous: 19,
			},
		},
	},
	{
		title: 'Exercise',
		timeframes: {
			daily: {
				current: 1,
				previous: 1,
			},
			weekly: {
				current: 4,
				previous: 5,
			},
			monthly: {
				current: 11,
				previous: 18,
			},
		},
	},
	{
		title: 'Social',
		timeframes: {
			daily: {
				current: 1,
				previous: 3,
			},
			weekly: {
				current: 5,
				previous: 10,
			},
			monthly: {
				current: 21,
				previous: 23,
			},
		},
	},
	{
		title: 'Self Care',
		timeframes: {
			daily: {
				current: 0,
				previous: 1,
			},
			weekly: {
				current: 2,
				previous: 2,
			},
			monthly: {
				current: 7,
				previous: 11,
			},
		},
	},
];

elements.forEach(element => elementNames.push(element.dataset.name));

const lastTimeContent = timeFrame => {
	if (timeFrame === 'daily') {
		return 'Yesterday';
	} else if (timeFrame === 'weekly') {
		return 'Last Week';
	} else if (timeFrame === 'monthly') {
		return 'Last Month';
	}
};

const elementsAddContent = e => {
	const timeFrame = e.target.dataset.timeFrame;
	let i = 0;

	timeSpentPerChosenTimeFrame.forEach(object => {
		if (object.title.toLocaleLowerCase() === elementNames[i]) {
			const actualTimeFrameText = elements[i].closest('div').nextElementSibling.children[0];
			const lastTimeFrameText = elements[i].closest('div').nextElementSibling.children[1];

			actualTimeFrameText.textContent = `${object.timeframes[timeFrame].current}hrs`;
			lastTimeFrameText.textContent = `${lastTimeContent(timeFrame)} - ${object.timeframes[timeFrame].previous}hrs`;
		}
		i++;
	});
};

const handleActiveState = e => {
	timeFrameBtns.forEach(button => {
		if (button.classList.contains('active')) {
			button.classList.remove('active');
		}
	});
	e.target.classList.add('active');
};

const handleContent = e => {
	handleActiveState(e);
	elementsAddContent(e);
};

timeFrameBtns.forEach(button => button.addEventListener('click', handleContent));
