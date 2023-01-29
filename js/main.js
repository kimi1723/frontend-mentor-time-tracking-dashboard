const timeFrameBtns = document.querySelectorAll('.header-card-time-periods__button');
const elements = document.querySelectorAll('h2');
const elementNames = [];

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

const elementsAddContent = (e, i) => {
	const timeFrame = e.target.dataset.timeFrame;
	fetch('./data.json')
		.then(res => res.json())
		.then(data =>
			data.forEach(object => {
				if (object.title.toLocaleLowerCase() === elementNames[i]) {
					const actualTimeFrameText = elements[i].closest('div').nextElementSibling.children[0];
					const lastTimeFrameText = elements[i].closest('div').nextElementSibling.children[1];

					actualTimeFrameText.textContent = `${object.timeframes[timeFrame].current}hrs`;
					lastTimeFrameText.textContent = `${lastTimeContent(timeFrame)} - ${object.timeframes[timeFrame].previous}hrs`;
				}
				i++;
			})
		)
		.catch(error => {
			console.log(error);
			alert('Sorry, there was an error loading your data');
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
	elementsAddContent(e, 0);
};

const onLoadData = i => {
	fetch('./data.json')
		.then(res => res.json())
		.then(data =>
			data.forEach(object => {
				const actualTimeFrameText = elements[i].closest('div').nextElementSibling.children[0];
				const lastTimeFrameText = elements[i].closest('div').nextElementSibling.children[1];

				actualTimeFrameText.textContent = `${object.timeframes.daily.current}hrs`;
				lastTimeFrameText.textContent = `Yesterday - ${object.timeframes.daily.previous}hrs`;

				i++;
			})
		)
		.catch(error => {
			console.log(error);
			alert('Sorry, there was an error loading your data');
		});
};

document.addEventListener('DOMContentLoaded', onLoadData(0));
timeFrameBtns.forEach(button => button.addEventListener('click', handleContent));
