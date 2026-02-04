let product = []
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())

    .then(data => {
        product = data
        category(product)
        display(product)
    })
const select = document.getElementById("select")
function category(data) {

    const allcat = [];
    data.forEach(el => {
        if (!allcat.includes(el.category)) {
            allcat.push(el.category)
        }
    });

    allcat.forEach(el => {
        select.innerHTML += `<option value="${el}">${el}</option>`
    })
}
function display(data) {
    const di = document.getElementById("divo")
    di.innerHTML = ""

    data.forEach(element => {
        di.innerHTML += `
            <div class='pro'>
                <img class='imge' src="${element.image}"/>
                <h2>${element.title}</h2>
                <h3 class='price'>${element.price}</h3>
                <button class="btnad">add</button>
            </div>
        `
    })
}

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btnad")) return
    const cont = document.getElementById("cont")
    const current =
        "value" in cont
            ? Number(cont.value || 0)
            : Number(cont.textContent || 0)
    const next = current + 1
    if ("value" in cont) {
        cont.value = next
    } else {
        cont.textContent = String(next)
    }
})

select.addEventListener("change", function filter() {
    if (select.value === "all") {
        display(product)
    } else {
        let resa = product.filter(el => el.category === select.value)
        display(resa)
    }
})
const searchInput = document.getElementById("sear")
searchInput.addEventListener("input", search)
function search() {
    const query = searchInput.value.trim().toLowerCase()
    if (query === "") {
        display(product)
        return
    }
    const res = product.filter(el => el.title.toLowerCase().includes(query))
    display(res)
}
