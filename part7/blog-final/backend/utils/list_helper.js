const dummy = () => {
    return 1
}



const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    if (blogs.length === 1) {
        return blogs[0].likes
    }
    const reduced = blogs.reduce((accum, current) => {
        return { likes: accum.likes + current.likes }
    })
    return reduced.likes
}


const favoriteBlog = (blogs) => {
    const topBLog = blogs.reduce((ac, cu) => ac.likes > cu.likes ? ac : cu)
    return topBLog

}

const mostBlogs = (blogs) => {
    const authors = {};
    for (let entry of blogs) {
        if (authors[entry.author]) {
            authors[entry.author] += 1
        } else {
            authors[entry.author] = 1
        }
    }

    const mostEntriesAuthor = Object.keys(authors).reduce((ac, cu) => authors[ac] > authors[cu] ? ac : cu)
    return {
        author: mostEntriesAuthor,
        entries: authors[mostEntriesAuthor]
    }
}


const mostLikes = (blogs) => {
    const authors = {};
    for (let entry of blogs) {
        if (authors[entry.author]) {
            authors[entry.author] += entry.likes
        } else {
            authors[entry.author] = entry.likes
        }
    }
    const mostLikedAuthor = Object.keys(authors).reduce((ac, cu) => authors[ac] > authors[cu] ? ac : cu)
    return {
        author: mostLikedAuthor,
        likes: authors[mostLikedAuthor]
    }
}


module.exports = {
    dummy,
    totalLikes,
    mostBlogs,
    favoriteBlog,
    mostLikes
}
