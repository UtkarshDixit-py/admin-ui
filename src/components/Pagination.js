import React, { useState } from 'react'

const Pagination = ({ currentPage , dataPerPage, totalData, paginate }) => {

  // let [toggle, setToggle] = useState(true);
  let [no, setNo] = useState(1);
  let totalPage = Math.ceil(totalData / dataPerPage)
  var color = "";
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pages.push(i)
  }

  return (
    <div>
      <div className="ui small basic right floated buttons">\

        <button className="ui button" onClick={() => {
          paginate(1)
          setNo(1)
        }}>&lt;&lt;</button>
        <button className="ui button" onClick={() => {
          if (no > 1) {
            paginate(no - 1)
            setNo((no) => no - 1)
            console.log(no)
          }
          if (no === 1) {
            setNo((no) => no + 1)
          }
        }}>&lt;</button>
        {pages.map((e) => {
          if(currentPage===e){color = "basic blue";}
          return (
            <>
              <button className={`active ui ${color} button`} onClick={() => {
                paginate(e)
                setNo(e)
              }}>{e}</button>
              {color=""}
            </>
          )
        })}

        <button className="ui button" onClick={() => {
          if (no < totalPage) {

            // console.log(no)
            paginate(no + 1)
            setNo((no) => no + 1)
            console.log(no)
          }

          if (no === totalPage) {
            setNo((no => no - 1))
          }

        }
        }>&gt;</button>
        <button className="ui button" onClick={() => {
          paginate(totalPage)
          setNo(totalPage)
        }}>&gt;&gt;</button>

      </div>

    </div>
  )
}

export default Pagination