export function hashRepostsNumber(posts){
    const hashTable= {};
    posts.forEach((post) => {
        if(post["who_shared_id"] !== null){
            if(hashTable[post["id"]] === undefined){
                hashTable[post["id"]] = 1;
            } else {
                hashTable[post["id"]]++;
            }
        }
    })
    return hashTable;
}