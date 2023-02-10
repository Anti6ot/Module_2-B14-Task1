
const Bookmark = (id, users) => {

    return (users.map(el => {
        if(el._id === id && !el.bookmark){
            el.bookmark = true
        } else if (el._id === id && el.bookmark){
            el.bookmark = false
        }
        return el
    }))
}

export default Bookmark