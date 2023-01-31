import Image from 'next/image'
import Link from 'next/link'

export function SearchItem({ hit, components }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--alignTop">
          <Image src={hit.image_url} alt={hit.name} width={160} height={90} />
        </div>
        <div className="aa-ItemContentBody">
          <Link className="aa-ItemContentTitle" href={`/posts/${hit.id}`}>
            <components.Highlight hit={hit} attribute="title" />
          </Link>
          {/* <div className="aa-ItemContentDescription">
            <components.Snippet hit={hit} attribute="title" />
          </div> */}
        </div>
      </div>
    </div>
  )
}
