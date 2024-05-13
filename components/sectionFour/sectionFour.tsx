import { NextFont } from 'next/dist/compiled/@next/font'
import UtilitiesContainer from './utilitiesContainer'

export default function SectionFour(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth flex flex-col items-center gap-y-24">
			<div className="flex w-full flex-col items-center justify-between gap-y-3 text-start lg:basis-5/12 lg:flex-row">
				<h3 className={'text-4xl tracking-wider text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl' + props.font.className}>Lorem ipsum dolor sit.</h3>

				<p className="text-md max-w-md text-center text-colorGray md:text-lg lg:max-w-lg lg:text-left xl:max-w-xl xl:text-xl 2xl:text-2xl">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente culpa possimus!
				</p>
			</div>

			<UtilitiesContainer font={props.font} />
		</section>
	)
}
