//Pagination

import { useEffect, useState } from "react"


export default function Pagination({limit ,offset, setOffset, data}){

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        setPage(1)
        if(data.length > offset+limit) setTotalPage(Math.ceil((data.length)/limit))
        else setTotalPage(1)
        
    }, [data])

    const leftHandler = () => {

        if(page-1 > 0){
            setOffset((prev) => prev - limit)
        setPage((prev) => prev-1)
        } 
    }

    const rightHandler = () => {
        if(page+1 <= totalPage){
            setOffset((prev) => prev + limit)
        setPage((prev) => prev+1)
        }
    }

    return(
        <div className="pagination">
            <button 
                onClick={() => leftHandler()} 
                className="page-button"
                disabled = {page === 1}
                >{'<<'}
            </button>
            <span>{page} / {totalPage}</span>
            <button 
                onClick={() => rightHandler()} 
                className="page-button"
                disabled = {page === totalPage}
                >{'>>'}
                </button>
        </div>
    )

}