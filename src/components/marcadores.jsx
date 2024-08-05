export function Marcador({texto, marca, clase}){
    return(
        <h3 className={clase}>{texto}{marca}</h3>
    )
}