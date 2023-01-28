import Image from 'next/image'

export function SearchItem({ hit, components }) {
  return (
    <div className="aa-ItemWrapper">
      <div className="aa-ItemContent">
        <div className="aa-ItemIcon aa-ItemIcon--alignTop">
          <Image src={hit.image_url} alt={hit.name} width={160} height={90} />
        </div>
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            <components.Highlight hit={hit} attribute="name" />
          </div>
          <div className="aa-ItemContentDescription">
            <components.Snippet hit={hit} attribute="title" />
          </div>
        </div>
      </div>
    </div>
  )
}
