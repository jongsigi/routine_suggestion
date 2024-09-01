export default function ProductDetails(props: any) {
  return (
    <h1>
      Product {props.params.productId} / {props.searchParams.country} Details
    </h1>
  );
}
