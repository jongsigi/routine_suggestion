// import { ProductList } from "@/ui/components/ProductList";
import SkinTypeList from '@/../public/SkinTypeList.json'

export const metadata = {
	title: "SiGi SkinCare",
	description:
		"SiGi SkinCare",
};

export default function Page({ params }: { params: { channel: string } }) {
	const data = SkinTypeList

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			{/* <ProductList products={products} /> */}
		</section>
	);
}
