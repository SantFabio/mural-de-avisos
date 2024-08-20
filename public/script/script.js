
document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})
// let idsPost = [];
function updatePosts() {
    fetch("http://192.168.3.50:5000/api/all", {
        method: "GET",
    }).then(res => {
        return res.json();
    }).then(data => {
        // console.log(data);
        let postElements = "";
        data.forEach(post => {
            // if (!idsPost.includes(post.id)) {
            // idsPost.push(post.id)
            let postElement =
                `<div id=${post.id} class="card mb-4">
                        <div class="card-header d-flex justify-content-between">
                            <h5 class="card-title">${post.title}</h5>
                            <button onclick="deletePost(this)">Excluir</button>
                        </div>
                        <div class="card-body">
                            <div class="card-text">${post.description}</div>
                        </div>
                </div>`;
            postElements += postElement;
            // }
        });
        document.getElementById("post").innerHTML = postElements;
    })
}
function newPost() {
    let title = document.getElementById("title").value
    let description = document.getElementById("desc").value
    let post = { title, description };
    let options = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(post)
    }
    fetch("http://192.168.3.50:5000/api/new", options)
        .then(res => {
            return res.text();
        }).then(data => {
            alert(data);
            updatePosts();
            document.getElementById("title").value = "";
            document.getElementById("desc").value = "";
        })
}
function deletePost(item) {
    const cardId = item.closest('.card').id; //closest para acessar o elemento .card do botão clicado
    fetch(`http://192.168.3.50:5000/api/delete/${cardId}`, {
        method: "DELETE"
    }).then(res => {
        if (!res.ok) {
            throw new Error('Erro na exclusão');
        }
        return res.text();
    })
        .then(data => {
            console.log(data);
            updatePosts();
        });
}
