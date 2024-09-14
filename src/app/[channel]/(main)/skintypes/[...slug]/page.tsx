import {SkinTypeHeader} from "@/ui/components/SkinTypeHeader"
import SkinTypesCollection from "@public/SkinTypesCollection.json";

export default function Docs({ params }: { params: { slug: string[] } }) {
  const matchingNode = SkinTypesCollection.collection?.types.edges.find(edge => {
    // Assuming node has a `slug` property to match against
    return edge.node.slug === params.slug[0];
  })?.node; // Access the `node` if a match is found

  return(
    <SkinTypeHeader matchingType={matchingNode}/>
  )
}
