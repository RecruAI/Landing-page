import { faBoxArchive, faGear, faLink } from '@fortawesome/free-solid-svg-icons'
import { NextFont } from 'next/dist/compiled/@next/font'
import Utility from './utility'

export default function UtilitiesContainer(props: { font: NextFont }) {
	const utilities: Array<{ title: string; paragraph: string; icon: any }> = [
		{
			title: 'With you everywhere',
			paragraph: 'Use Do It app, extensions and widgets on any device or platform',
			icon: faBoxArchive,
		},
		{
			title: 'Make Do It yours',
			paragraph: 'Customize your to-do list with filters, labels, prorities, and more.',
			icon: faGear,
		},
		{
			title: 'Connect with your other tools',
			paragraph: 'Link Do it with vour calendar, voice assistant. and 30+ other tools',
			icon: faLink,
		},
	]

	return (
		<div className="responsiveWidth mt-20 flex flex-col items-center justify-around gap-y-10 xl:flex-row">
			{utilities.map((utility) => (
				<Utility font={props.font} paragraph={utility.paragraph} title={utility.title} icon={utility.icon} key={utility.title} />
			))}
		</div>
	)
}
