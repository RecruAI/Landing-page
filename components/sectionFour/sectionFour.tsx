import { NextFont } from 'next/dist/compiled/@next/font'
import UtilitiesContainer from './utilitiesContainer'

export default function SectionFour(props: { font: NextFont }) {
	return (
		<section className="responsiveWidth flex flex-col items-center gap-y-24">
			<div className="flex w-full flex-col items-center justify-between gap-y-3 text-start lg:basis-5/12 lg:flex-row">
				<h3 className={'text-4xl tracking-wider text-[--text-rgb] sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl' + props.font.className}>
					And that&apos;s not all...
				</h3>

				<p className="text-md max-w-md text-center text-colorGray md:text-lg lg:max-w-lg lg:text-left xl:max-w-xl xl:text-xl 2xl:text-2xl">
					There&apos;s so much to enjoy in Do It. Here are a few more little touches we think you&apos;re going to love:
				</p>
			</div>

			<UtilitiesContainer font={props.font} />
		</section>
	)
}
