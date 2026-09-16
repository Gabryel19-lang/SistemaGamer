/* =====================================================
   NEXTXP GAMING
   SCRIPT.JS
===================================================== */


/* =====================================================
   FUNÇÕES GERAIS
===================================================== */

function converterPreco(texto) {

    if (!texto) {
        return 0;
    }

    return Number(
        texto
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );

}


function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* =====================================================
   LOCALSTORAGE DO CARRINHO
===================================================== */

function carregarCarrinho() {

    const dados =
        localStorage.getItem(
            "nextxpCarrinho"
        );

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    }

    catch {

        return [];

    }

}


function salvarCarrinho(carrinho) {

    localStorage.setItem(
        "nextxpCarrinho",
        JSON.stringify(carrinho)
    );


    const quantidadeTotal =
        carrinho.reduce(
            function (total, produto) {

                return total + produto.quantidade;

            },
            0
        );


    localStorage.setItem(
        "nextxpCarrinhoQuantidade",
        quantidadeTotal
    );


    atualizarNumeroCarrinho();

}


/* =====================================================
   CONTADOR DO CARRINHO
===================================================== */

function atualizarNumeroCarrinho() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {
        return;
    }


    const carrinho =
        carregarCarrinho();


    const quantidade =
        carrinho.reduce(
            function (total, produto) {

                return total + produto.quantidade;

            },
            0
        );


    cartCount.textContent =
        quantidade;

}


atualizarNumeroCarrinho();



/* =====================================================
   1. BOTÃO COMPRAR - HOME
===================================================== */

const botoesComprar =
    document.querySelectorAll(
        ".buy-button"
    );


if (botoesComprar.length > 0) {

    botoesComprar.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const card =
                        botao.closest(
                            ".product-card"
                        );


                    if (!card) {
                        return;
                    }


                    const nomeElemento =
                        card.querySelector("h3");


                    const descricaoElemento =
                        card.querySelector(
                            ".product-info p"
                        );


                    const precoElemento =
                        card.querySelector(
                            ".product-price"
                        );


                    const imagemElemento =
                        card.querySelector(
                            ".product-image img"
                        );


                    if (
                        !nomeElemento ||
                        !precoElemento
                    ) {

                        return;

                    }


                    const nome =
                        nomeElemento.textContent.trim();


                    const descricao =
                        descricaoElemento
                            ? descricaoElemento.textContent.trim()
                            : "";


                    const preco =
                        converterPreco(
                            precoElemento.textContent
                        );


                    const imagem =
                        imagemElemento
                            ? imagemElemento.getAttribute("src")
                            : "";


                    const id =
    card.dataset.id
    ||
    card.getAttribute(
        "data-name"
    )
    ||
    nome
        .toLowerCase()
        .replace(/\s+/g, "-");


                    const carrinho =
                        carregarCarrinho();


                    const produtoExistente =
                        carrinho.find(
                            function (produto) {

                                return produto.id === id;

                            }
                        );


                    if (produtoExistente) {

                        produtoExistente.quantidade++;

                    }

                    else {

                        carrinho.push({

                            id: id,

                            nome: nome,

                            descricao: descricao,

                            preco: preco,

                            imagem: imagem,

                            quantidade: 1

                        });

                    }


                    salvarCarrinho(
                        carrinho
                    );


                    alert(
                        nome +
                        " foi adicionado ao carrinho!"
                    );

                }
            );

        }
    );

}



/* =====================================================
   2. FAVORITOS
===================================================== */

/* =====================================================
   2. FAVORITOS
===================================================== */


/* =====================================================
   CARREGAR FAVORITOS
===================================================== */

function carregarFavoritos() {

    const dados =
        localStorage.getItem(
            "nextxpFavoritos"
        );


    if (!dados) {
        return [];
    }


    try {

        return JSON.parse(dados);

    }

    catch {

        return [];

    }

}


/* =====================================================
   SALVAR FAVORITOS
===================================================== */

function salvarFavoritos(
    favoritos
) {

    localStorage.setItem(
        "nextxpFavoritos",
        JSON.stringify(
            favoritos
        )
    );

}


/* =====================================================
   VERIFICAR SE PRODUTO É FAVORITO
===================================================== */

function produtoEhFavorito(
    id
) {

    const favoritos =
        carregarFavoritos();


    return favoritos.some(
        function (produto) {

            return produto.id === id;

        }
    );

}


/* =====================================================
   ATUALIZAR CORAÇÕES DA HOME
===================================================== */

function atualizarCoracoesFavoritos() {

    const botoes =
        document.querySelectorAll(
            ".favorite-btn"
        );


    botoes.forEach(
        function (botao) {

            const card =
                botao.closest(
                    ".product-card"
                );


            if (!card) {
                return;
            }


            const icone =
                botao.querySelector(
                    "i"
                );


            const nomeElemento =
                card.querySelector(
                    "h3"
                );


            if (
                !icone ||
                !nomeElemento
            ) {
                return;
            }


            const id =
    card.dataset.id
    ||
    card.getAttribute(
        "data-name"
    )
    ||
    nomeElemento.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");


            if (
                produtoEhFavorito(id)
            ) {

                icone.classList.remove(
                    "fa-regular"
                );

                icone.classList.add(
                    "fa-solid"
                );

                botao.style.color =
                    "#ff315f";

            }

            else {

                icone.classList.remove(
                    "fa-solid"
                );

                icone.classList.add(
                    "fa-regular"
                );

                botao.style.color =
                    "";

            }

        }
    );

}


/* =====================================================
   CLIQUE NO CORAÇÃO
===================================================== */

const botoesFavoritos =
    document.querySelectorAll(
        ".favorite-btn"
    );


botoesFavoritos.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const card =
                    botao.closest(
                        ".product-card"
                    );


                if (!card) {
                    return;
                }


                const nomeElemento =
                    card.querySelector(
                        "h3"
                    );


                const descricaoElemento =
                    card.querySelector(
                        ".product-info p"
                    );


                const precoElemento =
                    card.querySelector(
                        ".product-price"
                    );


                const imagemElemento =
                    card.querySelector(
                        ".product-image img"
                    );


                if (
                    !nomeElemento ||
                    !precoElemento
                ) {
                    return;
                }


                const nome =
                    nomeElemento.textContent
                        .trim();


                const descricao =
                    descricaoElemento
                        ? descricaoElemento.textContent
                            .trim()
                        : "";


                const preco =
                    converterPreco(
                        precoElemento.textContent
                    );


                const imagem =
                    imagemElemento
                        ? imagemElemento.getAttribute(
                            "src"
                        )
                        : "";


                const id =
    card.dataset.id
    ||
    card.getAttribute(
        "data-name"
    )
    ||
    nome
        .toLowerCase()
        .replace(/\s+/g, "-");

                let favoritos =
                    carregarFavoritos();


                const indice =
                    favoritos.findIndex(
                        function (produto) {

                            return (
                                produto.id ===
                                id
                            );

                        }
                    );


                /* Já era favorito → remover */
                if (indice !== -1) {

                    favoritos.splice(
                        indice,
                        1
                    );

                }

                /* Não era favorito → adicionar */
                else {

                    favoritos.push({

                        id: id,

                        nome: nome,

                        descricao: descricao,

                        preco: preco,

                        imagem: imagem

                    });

                }


                salvarFavoritos(
                    favoritos
                );


                atualizarCoracoesFavoritos();

            }
        );

    }
);


/* Marcar favoritos ao carregar a Home */
atualizarCoracoesFavoritos();



/* =====================================================
   3. PESQUISA - HOME
===================================================== */

const searchForm =
    document.getElementById(
        "searchForm"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const produtos =
    document.querySelectorAll(
        ".product-card"
    );


if (
    searchForm &&
    searchInput
) {

    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const pesquisa =
                searchInput.value
                    .toLowerCase()
                    .trim();


            produtos.forEach(
                function (produto) {

                    const nome =
                        (
                            produto.getAttribute(
                                "data-name"
                            )
                            || ""
                        ).toLowerCase();


                    if (
                        pesquisa === ""
                        ||
                        nome.includes(
                            pesquisa
                        )
                    ) {

                        produto.style.display =
                            "";

                    }

                    else {

                        produto.style.display =
                            "none";

                    }

                }
            );


            const ofertas =
                document.getElementById(
                    "ofertas"
                );


            if (ofertas) {

                ofertas.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}



/* =====================================================
   4. CONTADOR DAS OFERTAS
===================================================== */

const countdown =
    document.getElementById(
        "countdown"
    );


if (countdown) {

    let tempoRestante =
        (8 * 60 * 60)
        +
        (34 * 60)
        +
        12;


    function atualizarContador() {

        if (tempoRestante > 0) {

            tempoRestante--;

        }


        const horas =
            Math.floor(
                tempoRestante / 3600
            );


        const minutos =
            Math.floor(
                (tempoRestante % 3600)
                / 60
            );


        const segundos =
            tempoRestante % 60;


        countdown.textContent =
            String(horas)
                .padStart(2, "0")
            +
            " : "
            +
            String(minutos)
                .padStart(2, "0")
            +
            " : "
            +
            String(segundos)
                .padStart(2, "0");

    }


    setInterval(
        atualizarContador,
        1000
    );

}



/* =====================================================
   5. SLIDER DA HOME
===================================================== */

const slides =
    document.querySelectorAll(
        ".hero-slide"
    );


const dots =
    document.querySelectorAll(
        ".dot"
    );


const botaoAnterior =
    document.getElementById(
        "previousBanner"
    );


const botaoProximo =
    document.getElementById(
        "nextBanner"
    );


let slideAtual = 0;


function mostrarSlide(indice) {

    if (slides.length === 0) {
        return;
    }


    slides.forEach(
        function (slide) {

            slide.style.display =
                "none";

            slide.classList.remove(
                "active"
            );

        }
    );


    dots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    slides[indice].style.display =
        "block";


    slides[indice].classList.add(
        "active"
    );


    if (dots[indice]) {

        dots[indice].classList.add(
            "active"
        );

    }

}


if (slides.length > 0) {

    mostrarSlide(0);

}


if (botaoProximo) {

    botaoProximo.addEventListener(
        "click",
        function () {

            slideAtual++;

            if (
                slideAtual >=
                slides.length
            ) {

                slideAtual = 0;

            }

            mostrarSlide(
                slideAtual
            );

        }
    );

}


if (botaoAnterior) {

    botaoAnterior.addEventListener(
        "click",
        function () {

            slideAtual--;

            if (slideAtual < 0) {

                slideAtual =
                    slides.length - 1;

            }

            mostrarSlide(
                slideAtual
            );

        }
    );

}


dots.forEach(
    function (dot, indice) {

        dot.addEventListener(
            "click",
            function () {

                if (
                    indice <
                    slides.length
                ) {

                    slideAtual =
                        indice;

                    mostrarSlide(
                        slideAtual
                    );

                }

            }
        );

    }
);



/* =====================================================
   6. LOGIN
===================================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginEmail =
    document.getElementById(
        "loginEmail"
    );


const loginPassword =
    document.getElementById(
        "loginPassword"
    );


const rememberMe =
    document.getElementById(
        "rememberMe"
    );


if (
    loginForm &&
    loginEmail &&
    loginPassword
) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                loginEmail.value
                    .trim()
                    .toLowerCase();


            const senha =
                loginPassword.value;


            if (email === "") {

                alert(
                    "Digite seu e-mail."
                );

                loginEmail.focus();

                return;

            }


            if (
                !email.includes("@")
            ) {

                alert(
                    "Digite um e-mail válido."
                );

                loginEmail.focus();

                return;

            }


            if (senha === "") {

                alert(
                    "Digite sua senha."
                );

                loginPassword.focus();

                return;

            }


            /* =========================================
               PROCURAR CONTA CADASTRADA
            ========================================= */

            const contas =
                carregarContas();


            const conta =
                contas.find(
                    function (usuario) {

                        return (
                            usuario.email
                                .toLowerCase()
                            ===
                            email
                        );

                    }
                );


            /* Conta não existe */
            if (!conta) {

                alert(
                    "Conta não encontrada. Crie uma conta antes de entrar."
                );

                return;

            }


            /* Senha incorreta */
            if (
                conta.senha !==
                senha
            ) {

                alert(
                    "Senha incorreta."
                );

                loginPassword.focus();

                return;

            }


            /* =========================================
               LOGIN CORRETO
            ========================================= */

            const usuario = {

                id:
                    conta.id,

                nome:
                    conta.nome,

                email:
                    conta.email,

                logado:
                    true

            };


            localStorage.setItem(
                "nextxpUsuario",
                JSON.stringify(
                    usuario
                )
            );


            /* Lembrar e-mail */
            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    "nextxpEmailLembrado",
                    email
                );

            }

            else {

                localStorage.removeItem(
                    "nextxpEmailLembrado"
                );

            }


            alert(
                "Login realizado com sucesso!"
            );


            window.location.href =
                "../index.html";

        }
    );

}



/* =====================================================
   7. MOSTRAR / OCULTAR SENHA
===================================================== */

const showPassword =
    document.getElementById(
        "showPassword"
    );


if (
    showPassword &&
    loginPassword
) {

    showPassword.addEventListener(
        "click",
        function () {

            const icone =
                showPassword.querySelector(
                    "i"
                );


            if (
                loginPassword.type
                === "password"
            ) {

                loginPassword.type =
                    "text";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye"
                    );

                    icone.classList.add(
                        "fa-eye-slash"
                    );

                }

            }

            else {

                loginPassword.type =
                    "password";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye-slash"
                    );

                    icone.classList.add(
                        "fa-eye"
                    );

                }

            }

        }
    );

}



/* =====================================================
   8. LEMBRAR E-MAIL
===================================================== */

if (loginEmail) {

    const emailSalvo =
        localStorage.getItem(
            "nextxpEmailLembrado"
        );


    if (emailSalvo) {

        loginEmail.value =
            emailSalvo;


        if (rememberMe) {

            rememberMe.checked =
                true;

        }

    }

}



/* =====================================================
   9. USUÁRIO LOGADO NA HOME
===================================================== */

const usuarioSalvo =
    localStorage.getItem(
        "nextxpUsuario"
    );


if (usuarioSalvo) {

    try {

        const usuario =
            JSON.parse(
                usuarioSalvo
            );


        if (usuario.logado) {

            const linkConta =
                document.querySelector(
                    'a[href="pages/login.html"]'
                );


            if (linkConta) {

                const titulo =
                    linkConta.querySelector(
                        "strong"
                    );


                const subtitulo =
                    linkConta.querySelector(
                        "span"
                    );


                if (titulo) {

                    titulo.textContent =
                        "Minha Conta";

                }


                if (subtitulo) {

                    subtitulo.textContent =
                        usuario.email;

                }

            }

        }

    }

    catch {

        console.log(
            "Erro ao carregar usuário."
        );

    }

}



/* =====================================================
   10. PÁGINA DO CARRINHO
===================================================== */

const cartProductsList =
    document.getElementById(
        "cartProductsList"
    );


const emptyCart =
    document.getElementById(
        "emptyCart"
    );


const cartItemsCount =
    document.getElementById(
        "cartItemsCount"
    );


const cartSubtotal =
    document.getElementById(
        "cartSubtotal"
    );


const cartShipping =
    document.getElementById(
        "cartShipping"
    );


const cartDiscount =
    document.getElementById(
        "cartDiscount"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


let descontoCarrinho =
    Number(
        localStorage.getItem(
            "nextxpDescontoCarrinho"
        )
    ) || 0;



/* =====================================================
   CORRIGIR CAMINHO DA IMAGEM NO CARRINHO
===================================================== */

function caminhoImagemCarrinho(
    caminho
) {

    if (!caminho) {
        return "";
    }


    if (
        caminho.startsWith(
            "assets/"
        )
    ) {

        return "../" + caminho;

    }


    return caminho;

}



/* =====================================================
   CALCULAR VALORES
===================================================== */

function calcularCarrinho() {

    const carrinho =
        carregarCarrinho();


    const subtotal =
        carrinho.reduce(
            function (
                total,
                produto
            ) {

                return (
                    total
                    +
                    (
                        produto.preco
                        *
                        produto.quantidade
                    )
                );

            },
            0
        );


    /* Frete grátis acima de R$ 299 */

    let frete = 0;


    if (
        subtotal > 0 &&
        subtotal < 299
    ) {

        frete = 29.90;

    }


    const desconto =
        subtotal
        *
        descontoCarrinho;


    const total =
        subtotal
        -
        desconto
        +
        frete;


    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatarPreco(
                subtotal
            );

    }


    if (cartShipping) {

        if (
            frete === 0 &&
            subtotal > 0
        ) {

            cartShipping.textContent =
                "GRÁTIS";

        }

        else {

            cartShipping.textContent =
                formatarPreco(
                    frete
                );

        }

    }


    if (cartDiscount) {

        cartDiscount.textContent =
            "- "
            +
            formatarPreco(
                desconto
            );

    }


    if (cartTotal) {

        cartTotal.textContent =
            formatarPreco(
                total
            );

    }

}



/* =====================================================
   RENDERIZAR CARRINHO
===================================================== */

function renderizarCarrinho() {

    if (!cartProductsList) {
        return;
    }


    const carrinho =
        carregarCarrinho();


    cartProductsList.innerHTML =
        "";


    const quantidadeTotal =
        carrinho.reduce(
            function (
                total,
                produto
            ) {

                return (
                    total
                    +
                    produto.quantidade
                );

            },
            0
        );


    if (cartItemsCount) {

        cartItemsCount.textContent =
            quantidadeTotal
            +
            (
                quantidadeTotal === 1
                    ? " produto"
                    : " produtos"
            );

    }


    if (carrinho.length === 0) {

        if (emptyCart) {

            emptyCart.style.display =
                "flex";

        }


        if (checkoutButton) {

            checkoutButton.disabled =
                true;

        }


        calcularCarrinho();

        return;

    }


    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    if (checkoutButton) {

        checkoutButton.disabled =
            false;

    }


    carrinho.forEach(
        function (produto) {

            const item =
                document.createElement(
                    "article"
                );


            item.classList.add(
                "cart-item"
            );


            const imagem =
                caminhoImagemCarrinho(
                    produto.imagem
                );


            item.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${imagem}"
                        alt="${produto.nome}"
                    >

                </div>


                <div class="cart-item-info">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p>
                        ${produto.descricao}
                    </p>

                    <span class="cart-item-stock">

                        ● Em estoque

                    </span>

                </div>


                <div class="cart-item-price">

                    ${formatarPreco(
                        produto.preco
                        *
                        produto.quantidade
                    )}

                </div>


                <div class="quantity-control">

                    <button
                        type="button"
                        class="decrease-quantity"
                        data-id="${produto.id}"
                    >
                        −
                    </button>


                    <span>

                        ${produto.quantidade}

                    </span>


                    <button
                        type="button"
                        class="increase-quantity"
                        data-id="${produto.id}"
                    >
                        +
                    </button>

                </div>


                <button
                    type="button"
                    class="remove-item"
                    data-id="${produto.id}"
                >

                    <i class="fa-solid fa-trash"></i>

                    Remover

                </button>

            `;


            cartProductsList.appendChild(
                item
            );

        }
    );


    adicionarEventosCarrinho();

    calcularCarrinho();

}



/* =====================================================
   EVENTOS DOS PRODUTOS NO CARRINHO
===================================================== */

function adicionarEventosCarrinho() {

    const aumentar =
        document.querySelectorAll(
            ".increase-quantity"
        );


    const diminuir =
        document.querySelectorAll(
            ".decrease-quantity"
        );


    const remover =
        document.querySelectorAll(
            ".remove-item"
        );


    aumentar.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    alterarQuantidade(
                        botao.dataset.id,
                        1
                    );

                }
            );

        }
    );


    diminuir.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    alterarQuantidade(
                        botao.dataset.id,
                        -1
                    );

                }
            );

        }
    );


    remover.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    removerProduto(
                        botao.dataset.id
                    );

                }
            );

        }
    );

}



/* =====================================================
   ALTERAR QUANTIDADE
===================================================== */

function alterarQuantidade(
    id,
    valor
) {

    const carrinho =
        carregarCarrinho();


    const produto =
        carrinho.find(
            function (produto) {

                return produto.id === id;

            }
        );


    if (!produto) {
        return;
    }


    produto.quantidade +=
        valor;


    if (
        produto.quantidade <= 0
    ) {

        removerProduto(id);

        return;

    }


    salvarCarrinho(
        carrinho
    );


    renderizarCarrinho();

}



/* =====================================================
   REMOVER PRODUTO
===================================================== */

function removerProduto(id) {

    let carrinho =
        carregarCarrinho();


    carrinho =
        carrinho.filter(
            function (produto) {

                return produto.id !== id;

            }
        );


    salvarCarrinho(
        carrinho
    );


    renderizarCarrinho();

}



/* =====================================================
   CUPOM
===================================================== */

const applyCoupon =
    document.getElementById(
        "applyCoupon"
    );


const couponInput =
    document.getElementById(
        "couponInput"
    );


const couponMessage =
    document.getElementById(
        "couponMessage"
    );


if (
    applyCoupon &&
    couponInput
) {

    applyCoupon.addEventListener(
        "click",
        function () {

            const cupom =
                couponInput.value
                    .trim()
                    .toUpperCase();


            if (
    cupom ===
    "NEXTXP10"
) {

    descontoCarrinho = 0.10;

    localStorage.setItem(
        "nextxpDescontoCarrinho",
        descontoCarrinho
    );

                if (couponMessage) {

                    couponMessage.textContent =
                        "Cupom aplicado: 10% de desconto!";

                    couponMessage.style.color =
                        "#27e38a";

                }

            }

            else {

                descontoCarrinho = 0;

localStorage.removeItem(
    "nextxpDescontoCarrinho"
);


                if (couponMessage) {

                    couponMessage.textContent =
                        "Cupom inválido.";

                    couponMessage.style.color =
                        "#ff5364";

                }

            }


            calcularCarrinho();

        }
    );

}



/* =====================================================
   FINALIZAR PEDIDO
===================================================== */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            const carrinho =
                carregarCarrinho();


            if (
                carrinho.length === 0
            ) {

                alert(
                    "Seu carrinho está vazio."
                );

                return;

            }


            const usuario =
                localStorage.getItem(
                    "nextxpUsuario"
                );


            if (!usuario) {

                alert(
                    "Faça login antes de finalizar o pedido."
                );


                window.location.href =
                    "login.html";


                return;

            }


           window.location.href =
    "checkout.html";

        }
    );

}



/* =====================================================
   INICIAR PÁGINA DO CARRINHO
===================================================== */

if (cartProductsList) {

    renderizarCarrinho();

}
/* =====================================================
   11. CHECKOUT
===================================================== */


/* =====================================================
   ELEMENTOS DO CHECKOUT
===================================================== */

const checkoutProductsContainer =
    document.getElementById(
        "checkoutProducts"
    );


const checkoutSubtotalElement =
    document.getElementById(
        "checkoutSubtotal"
    );


const checkoutShippingElement =
    document.getElementById(
        "checkoutShipping"
    );


const checkoutTotalElement =
    document.getElementById(
        "checkoutTotal"
    );


const confirmOrderButton =
    document.getElementById(
        "confirmOrderButton"
    );


const cardPaymentForm =
    document.getElementById(
        "cardPaymentForm"
    );


/* =====================================================
   PEGAR DESCONTO SALVO
===================================================== */

function carregarDescontoCheckout() {

    return Number(
        localStorage.getItem(
            "nextxpDescontoCarrinho"
        )
    ) || 0;

}


/* =====================================================
   CALCULAR VALORES DO CHECKOUT
===================================================== */

function calcularValoresCheckout() {

    const carrinho =
        carregarCarrinho();


    const subtotal =
        carrinho.reduce(
            function (
                total,
                produto
            ) {

                return (
                    total
                    +
                    (
                        produto.preco
                        *
                        produto.quantidade
                    )
                );

            },
            0
        );


    let frete = 0;


    /* Frete grátis acima de R$ 299 */
    if (
        subtotal > 0 &&
        subtotal < 299
    ) {

        frete = 29.90;

    }


    const percentualDesconto =
        carregarDescontoCheckout();


    const desconto =
        subtotal *
        percentualDesconto;


    const total =
        subtotal
        -
        desconto
        +
        frete;


    return {

        subtotal: subtotal,

        desconto: desconto,

        frete: frete,

        total: total

    };

}



/* =====================================================
   MOSTRAR PRODUTOS NO CHECKOUT
===================================================== */

function renderizarCheckout() {

    if (!checkoutProductsContainer) {
        return;
    }


    const carrinho =
        carregarCarrinho();


    checkoutProductsContainer.innerHTML =
        "";


    /* Se carrinho estiver vazio */
    if (carrinho.length === 0) {

        checkoutProductsContainer.innerHTML = `

            <div
                style="
                    text-align:center;
                    padding:20px;
                    color:#8fa5bd;
                    font-size:11px;
                "
            >

                Seu carrinho está vazio.

            </div>

        `;


        if (confirmOrderButton) {

            confirmOrderButton.disabled =
                true;

        }


        return;

    }


    if (confirmOrderButton) {

        confirmOrderButton.disabled =
            false;

    }


    /* Criar os produtos */
    carrinho.forEach(
        function (produto) {

            const produtoCheckout =
                document.createElement(
                    "div"
                );


            produtoCheckout.classList.add(
                "checkout-product"
            );


            const imagem =
                caminhoImagemCarrinho(
                    produto.imagem
                );


            produtoCheckout.innerHTML = `

                <img
                    src="${imagem}"
                    alt="${produto.nome}"
                >


                <div
                    class="checkout-product-info"
                >

                    <strong>
                        ${produto.nome}
                    </strong>

                    <span>

                        Quantidade:
                        ${produto.quantidade}

                    </span>

                </div>


                <div
                    class="checkout-product-price"
                >

                    ${formatarPreco(
                        produto.preco
                        *
                        produto.quantidade
                    )}

                </div>

            `;


            checkoutProductsContainer
                .appendChild(
                    produtoCheckout
                );

        }
    );


    atualizarResumoCheckout();

}



/* =====================================================
   ATUALIZAR RESUMO
===================================================== */

function atualizarResumoCheckout() {

    const valores =
        calcularValoresCheckout();


    if (checkoutSubtotalElement) {

        checkoutSubtotalElement.textContent =
            formatarPreco(
                valores.subtotal
            );

    }


    if (checkoutShippingElement) {

        if (
            valores.frete === 0 &&
            valores.subtotal > 0
        ) {

            checkoutShippingElement.textContent =
                "GRÁTIS";

        }

        else {

            checkoutShippingElement.textContent =
                formatarPreco(
                    valores.frete
                );

        }

    }


    if (checkoutTotalElement) {

        checkoutTotalElement.textContent =
            formatarPreco(
                valores.total
            );

    }

}



/* =====================================================
   12. FORMAS DE PAGAMENTO
===================================================== */

const formasPagamento =
    document.querySelectorAll(
        'input[name="payment"]'
    );


function atualizarFormaPagamento() {

    if (
        formasPagamento.length === 0
    ) {
        return;
    }


    const pagamentoSelecionado =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!pagamentoSelecionado) {
        return;
    }


    const forma =
        pagamentoSelecionado.value;


    /* Mostrar formulário do cartão */
    if (
        forma === "cartao"
    ) {

        if (cardPaymentForm) {

            cardPaymentForm.style.display =
                "block";

        }

    }

    else {

        if (cardPaymentForm) {

            cardPaymentForm.style.display =
                "none";

        }

    }

}


formasPagamento.forEach(
    function (opcao) {

        opcao.addEventListener(
            "change",
            atualizarFormaPagamento
        );

    }
);


atualizarFormaPagamento();



/* =====================================================
   13. PREENCHER E-MAIL DO USUÁRIO LOGADO
===================================================== */

const checkoutEmailInput =
    document.getElementById(
        "checkoutEmail"
    );


if (
    checkoutEmailInput &&
    usuarioSalvo
) {

    try {

        const usuarioCheckout =
            JSON.parse(
                usuarioSalvo
            );


        if (
            usuarioCheckout.email
        ) {

            checkoutEmailInput.value =
                usuarioCheckout.email;

        }

    }

    catch {

        console.log(
            "Não foi possível carregar o usuário."
        );

    }

}



/* =====================================================
   14. MÁSCARA SIMPLES DO CPF
===================================================== */

const checkoutCpf =
    document.getElementById(
        "checkoutCpf"
    );


if (checkoutCpf) {

    checkoutCpf.addEventListener(
        "input",
        function () {

            let valor =
                checkoutCpf.value
                    .replace(/\D/g, "")
                    .slice(0, 11);


            valor =
                valor.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            valor =
                valor.replace(
                    /(\d{3})(\d)/,
                    "$1.$2"
                );


            valor =
                valor.replace(
                    /(\d{3})(\d{1,2})$/,
                    "$1-$2"
                );


            checkoutCpf.value =
                valor;

        }
    );

}



/* =====================================================
   15. MÁSCARA DO CEP
===================================================== */

const checkoutCep =
    document.getElementById(
        "checkoutCep"
    );


if (checkoutCep) {

    checkoutCep.addEventListener(
        "input",
        function () {

            let valor =
                checkoutCep.value
                    .replace(/\D/g, "")
                    .slice(0, 8);


            valor =
                valor.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );


            checkoutCep.value =
                valor;

        }
    );

}



/* =====================================================
   16. MÁSCARA DO TELEFONE
===================================================== */

const checkoutPhone =
    document.getElementById(
        "checkoutPhone"
    );


if (checkoutPhone) {

    checkoutPhone.addEventListener(
        "input",
        function () {

            let valor =
                checkoutPhone.value
                    .replace(/\D/g, "")
                    .slice(0, 11);


            if (
                valor.length > 10
            ) {

                valor =
                    valor.replace(
                        /(\d{2})(\d{5})(\d{4})/,
                        "($1) $2-$3"
                    );

            }

            else {

                valor =
                    valor.replace(
                        /(\d{2})(\d{4})(\d{4})/,
                        "($1) $2-$3"
                    );

            }


            checkoutPhone.value =
                valor;

        }
    );

}



/* =====================================================
   17. NÚMERO DO CARTÃO
===================================================== */

const cardNumber =
    document.getElementById(
        "cardNumber"
    );


if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        function () {

            let valor =
                cardNumber.value
                    .replace(/\D/g, "")
                    .slice(0, 16);


            valor =
                valor.replace(
                    /(\d{4})(?=\d)/g,
                    "$1 "
                );


            cardNumber.value =
                valor;

        }
    );

}



/* =====================================================
   18. VALIDADE DO CARTÃO
===================================================== */

const cardExpiration =
    document.getElementById(
        "cardExpiration"
    );


if (cardExpiration) {

    cardExpiration.addEventListener(
        "input",
        function () {

            let valor =
                cardExpiration.value
                    .replace(/\D/g, "")
                    .slice(0, 4);


            if (
                valor.length >= 3
            ) {

                valor =
                    valor.slice(0, 2)
                    +
                    "/"
                    +
                    valor.slice(2);

            }


            cardExpiration.value =
                valor;

        }
    );

}



/* =====================================================
   19. CVV
===================================================== */

const cardCvv =
    document.getElementById(
        "cardCvv"
    );


if (cardCvv) {

    cardCvv.addEventListener(
        "input",
        function () {

            cardCvv.value =
                cardCvv.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

        }
    );

}



/* =====================================================
   20. VALIDAR CHECKOUT
===================================================== */

function validarCheckout() {

    const camposObrigatorios = [

        {
            id: "checkoutName",
            nome: "nome completo"
        },

        {
            id: "checkoutEmail",
            nome: "e-mail"
        },

        {
            id: "checkoutPhone",
            nome: "telefone"
        },

        {
            id: "checkoutCpf",
            nome: "CPF"
        },

        {
            id: "checkoutCep",
            nome: "CEP"
        },

        {
            id: "checkoutStreet",
            nome: "rua"
        },

        {
            id: "checkoutNumber",
            nome: "número"
        },

        {
            id: "checkoutNeighborhood",
            nome: "bairro"
        },

        {
            id: "checkoutCity",
            nome: "cidade"
        },

        {
            id: "checkoutState",
            nome: "estado"
        }

    ];


    for (
        const campo
        of camposObrigatorios
    ) {

        const elemento =
            document.getElementById(
                campo.id
            );


        if (
            !elemento ||
            elemento.value.trim() === ""
        ) {

            alert(
                "Preencha o campo "
                +
                campo.nome
                +
                "."
            );


            if (elemento) {

                elemento.focus();

            }


            return false;

        }

    }


    /* Verificar e-mail */
    const email =
        document.getElementById(
            "checkoutEmail"
        );


    if (
        email &&
        !email.value.includes("@")
    ) {

        alert(
            "Digite um e-mail válido."
        );

        email.focus();

        return false;

    }


    /* Pagamento */
    const pagamento =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!pagamento) {

        alert(
            "Escolha uma forma de pagamento."
        );

        return false;

    }


    /* Se for cartão */
    if (
        pagamento.value ===
        "cartao"
    ) {

        const camposCartao = [

            {
                id: "cardNumber",
                nome: "número do cartão"
            },

            {
                id: "cardName",
                nome: "nome do cartão"
            },

            {
                id: "cardExpiration",
                nome: "validade"
            },

            {
                id: "cardCvv",
                nome: "CVV"
            }

        ];


        for (
            const campo
            of camposCartao
        ) {

            const elemento =
                document.getElementById(
                    campo.id
                );


            if (
                !elemento ||
                elemento.value.trim() === ""
            ) {

                alert(
                    "Preencha "
                    +
                    campo.nome
                    +
                    "."
                );


                if (elemento) {

                    elemento.focus();

                }


                return false;

            }

        }

    }


    return true;

}



/* =====================================================
   21. GERAR NÚMERO DO PEDIDO
===================================================== */

function gerarNumeroPedido() {

    const numero =
        Math.floor(
            100000 +
            Math.random()
            *
            900000
        );


    return (
        "NXP"
        +
        numero
    );

}



/* =====================================================
   22. CONFIRMAR PEDIDO
===================================================== */

if (confirmOrderButton) {

    confirmOrderButton.addEventListener(
        "click",
        function () {

            const carrinho =
                carregarCarrinho();


            if (
                carrinho.length === 0
            ) {

                alert(
                    "Seu carrinho está vazio."
                );

                return;

            }


            if (
                !validarCheckout()
            ) {

                return;

            }


            const pagamentoSelecionado =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const valores =
                calcularValoresCheckout();


            const numeroPedido =
                gerarNumeroPedido();


            const pedido = {

                numero:
                    numeroPedido,

                data:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        ),

                produtos:
                    carrinho,

                subtotal:
                    valores.subtotal,

                desconto:
                    valores.desconto,

                frete:
                    valores.frete,

                total:
                    valores.total,

                pagamento:
                    pagamentoSelecionado.value,

                cliente: {

                    nome:
                        document
                            .getElementById(
                                "checkoutName"
                            )
                            .value,

                    email:
                        document
                            .getElementById(
                                "checkoutEmail"
                            )
                            .value,

                    telefone:
                        document
                            .getElementById(
                                "checkoutPhone"
                            )
                            .value,

                    cpf:
                        document
                            .getElementById(
                                "checkoutCpf"
                            )
                            .value

                },

                endereco: {

                    cep:
                        document
                            .getElementById(
                                "checkoutCep"
                            )
                            .value,

                    rua:
                        document
                            .getElementById(
                                "checkoutStreet"
                            )
                            .value,

                    numero:
                        document
                            .getElementById(
                                "checkoutNumber"
                            )
                            .value,

                    complemento:
                        document
                            .getElementById(
                                "checkoutComplement"
                            )
                            .value,

                    bairro:
                        document
                            .getElementById(
                                "checkoutNeighborhood"
                            )
                            .value,

                    cidade:
                        document
                            .getElementById(
                                "checkoutCity"
                            )
                            .value,

                    estado:
                        document
                            .getElementById(
                                "checkoutState"
                            )
                            .value

                }

            };


            /* =================================================
               SALVAR PEDIDO
            ================================================= */

            let pedidos = [];


            const pedidosSalvos =
                localStorage.getItem(
                    "nextxpPedidos"
                );


            if (pedidosSalvos) {

                try {

                    pedidos =
                        JSON.parse(
                            pedidosSalvos
                        );

                }

                catch {

                    pedidos = [];

                }

            }


            pedidos.push(
    pedido
);


/* Salvar todos os pedidos */
localStorage.setItem(
    "nextxpPedidos",
    JSON.stringify(
        pedidos
    )
);


/* Salvar o pedido que acabou de ser feito */
localStorage.setItem(
    "nextxpUltimoPedido",
    JSON.stringify(
        pedido
    )
);


/* Limpar carrinho */
localStorage.removeItem(
    "nextxpCarrinho"
);

localStorage.removeItem(
    "nextxpCarrinhoQuantidade"
);

localStorage.removeItem(
    "nextxpDescontoCarrinho"
);


/* Ir para a página de pedido confirmado */
window.location.href =
    "pedido-confirmado.html";
            }
    );

}

/* =====================================================
   INICIAR CHECKOUT
===================================================== */

if (checkoutProductsContainer) {

    renderizarCheckout();

}
/* =====================================================
   23. PÁGINA DE PEDIDO CONFIRMADO
===================================================== */

const successOrderNumber =
    document.getElementById(
        "successOrderNumber"
    );


const successOrderTotal =
    document.getElementById(
        "successOrderTotal"
    );


const successPayment =
    document.getElementById(
        "successPayment"
    );


const successOrderDate =
    document.getElementById(
        "successOrderDate"
    );


const viewOrderButton =
    document.getElementById(
        "viewOrderButton"
    );


/* =====================================================
   CARREGAR ÚLTIMO PEDIDO
===================================================== */

function carregarUltimoPedido() {

    const pedidoSalvo =
        localStorage.getItem(
            "nextxpUltimoPedido"
        );


    if (!pedidoSalvo) {

        return null;

    }


    try {

        return JSON.parse(
            pedidoSalvo
        );

    }

    catch (erro) {

        console.error(
            "Erro ao carregar último pedido:",
            erro
        );


        return null;

    }

}



/* =====================================================
   FORMATAR FORMA DE PAGAMENTO
===================================================== */

function formatarFormaPagamento(
    forma
) {

    switch (forma) {

        case "cartao":

            return "Cartão de Crédito";


        case "pix":

            return "PIX";


        case "boleto":

            return "Boleto";


        default:

            return "Não informado";

    }

}



/* =====================================================
   MOSTRAR DADOS DO PEDIDO
===================================================== */

function mostrarPedidoConfirmado() {

    const pedido =
        carregarUltimoPedido();


    if (!pedido) {

        if (successOrderNumber) {

            successOrderNumber.textContent =
                "Pedido não encontrado";

        }


        if (successOrderTotal) {

            successOrderTotal.textContent =
                "R$ 0,00";

        }


        if (successPayment) {

            successPayment.textContent =
                "-";

        }


        if (successOrderDate) {

            successOrderDate.textContent =
                "-";

        }


        if (viewOrderButton) {

            viewOrderButton.disabled =
                true;

        }


        return;

    }


    /* Número do pedido */
    if (successOrderNumber) {

        successOrderNumber.textContent =
            pedido.numero;

    }


    /* Total */
    if (successOrderTotal) {

        successOrderTotal.textContent =
            formatarPreco(
                pedido.total
            );

    }


    /* Pagamento */
    if (successPayment) {

        successPayment.textContent =
            formatarFormaPagamento(
                pedido.pagamento
            );

    }


    /* Data */
    if (successOrderDate) {

        successOrderDate.textContent =
            pedido.data;

    }

}



/* =====================================================
   BOTÃO VER PEDIDO
===================================================== */

if (viewOrderButton) {

    viewOrderButton.addEventListener(
        "click",
        function () {

            const pedido =
                carregarUltimoPedido();


            if (!pedido) {

                alert(
                    "Nenhum pedido foi encontrado."
                );

                return;

            }


            localStorage.setItem(
                "nextxpPedidoSelecionado",
                pedido.numero
            );


            window.location.href =
                "pedido-detalhes.html";

        }
    );

}



/* =====================================================
   INICIAR PÁGINA DE PEDIDO CONFIRMADO
===================================================== */

if (
    successOrderNumber ||
    successOrderTotal
) {

    mostrarPedidoConfirmado();

}
/* =====================================================
   24. MINHA CONTA
===================================================== */

const accountUserName =
    document.getElementById(
        "accountUserName"
    );

const accountUserEmail =
    document.getElementById(
        "accountUserEmail"
    );

const profileEmail =
    document.getElementById(
        "profileEmail"
    );

const totalOrders =
    document.getElementById(
        "totalOrders"
    );

const totalProductsBought =
    document.getElementById(
        "totalProductsBought"
    );

const totalSpent =
    document.getElementById(
        "totalSpent"
    );

const lastOrderContainer =
    document.getElementById(
        "lastOrderContainer"
    );

const ordersList =
    document.getElementById(
        "ordersList"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const viewAllOrders =
    document.getElementById(
        "viewAllOrders"
    );

const accountMenuItems =
    document.querySelectorAll(
        ".account-menu-item[data-section]"
    );

const accountSections =
    document.querySelectorAll(
        ".account-section"
    );


/* =====================================================
   CARREGAR PEDIDOS
===================================================== */

function carregarPedidos() {

    const dados =
        localStorage.getItem(
            "nextxpPedidos"
        );

    if (!dados) {
        return [];
    }

    try {

        return JSON.parse(dados);

    }

    catch {

        return [];

    }

}


/* =====================================================
   MOSTRAR SEÇÃO DA CONTA
===================================================== */

function mostrarSecaoConta(
    sectionId
) {

    accountSections.forEach(
        function (secao) {

            secao.classList.remove(
                "active"
            );

        }
    );


    accountMenuItems.forEach(
        function (botao) {

            botao.classList.remove(
                "active"
            );

        }
    );


    const secaoSelecionada =
        document.getElementById(
            sectionId
        );


    if (secaoSelecionada) {

        secaoSelecionada.classList.add(
            "active"
        );

    }


    const botaoSelecionado =
        document.querySelector(
            `.account-menu-item[data-section="${sectionId}"]`
        );


    if (botaoSelecionado) {

        botaoSelecionado.classList.add(
            "active"
        );

    }

}


/* =====================================================
   CLIQUES DO MENU
===================================================== */

accountMenuItems.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const sectionId =
                    botao.dataset.section;


                mostrarSecaoConta(
                    sectionId
                );

            }
        );

    }
);


/* =====================================================
   CRIAR CARD DE PEDIDO
===================================================== */

function criarCardPedido(
    pedido
) {

    const card =
        document.createElement(
            "div"
        );


    card.classList.add(
        "account-order-card"
    );


    const quantidadeProdutos =
        pedido.produtos.reduce(
            function (
                total,
                produto
            ) {

                return (
                    total
                    +
                    produto.quantidade
                );

            },
            0
        );


    card.innerHTML = `

        <div class="order-main-info">

            <div class="order-number">

                Pedido ${pedido.numero}

            </div>

            <span class="order-date">

                ${pedido.data}

            </span>

            <div class="order-items">

                ${quantidadeProdutos}
                ${
                    quantidadeProdutos === 1
                        ? " produto"
                        : " produtos"
                }

                •

                ${formatarFormaPagamento(
                    pedido.pagamento
                )}

            </div>

        </div>


        <div class="order-side-info">

            <strong class="order-total">

                ${formatarPreco(
                    pedido.total
                )}

            </strong>


            <span class="order-status">

                <i class="fa-solid fa-circle-check"></i>

                Pedido realizado

            </span>

        </div>

    `;

/* Abrir detalhes do pedido */
card.addEventListener(
    "click",
    function () {

        localStorage.setItem(
            "nextxpPedidoSelecionado",
            pedido.numero
        );


        window.location.href =
            "pedido-detalhes.html";

    }
);
    return card;

}


/* =====================================================
   CARREGAR DADOS DA CONTA
===================================================== */

function carregarMinhaConta() {

    /* Só executar na página Minha Conta */
    if (
        !accountUserEmail &&
        !ordersList
    ) {

        return;

    }


    const usuarioLocal =
        localStorage.getItem(
            "nextxpUsuario"
        );


    /* Usuário não logado */
    if (!usuarioLocal) {

        window.location.href =
            "login.html";

        return;

    }


    let usuarioConta;


    try {

        usuarioConta =
            JSON.parse(
                usuarioLocal
            );

    }

    catch {

        window.location.href =
            "login.html";

        return;

    }


    /* =================================================
       PEDIDOS
    ================================================= */

    const pedidos =
        carregarPedidos();


    /* =================================================
       E-MAIL
    ================================================= */

    if (accountUserEmail) {

        accountUserEmail.textContent =
            usuarioConta.email;

    }


    if (profileEmail) {

        profileEmail.value =
            usuarioConta.email;

    }


    /* =================================================
       NOME DO CLIENTE
    ================================================= */

    let nomeCliente =
    usuarioConta.nome
    ||
    "Cliente NextXP";


    if (accountUserName) {

        accountUserName.textContent =
            nomeCliente;

    }


    /* =================================================
       TOTAL DE PEDIDOS
    ================================================= */

    if (totalOrders) {

        totalOrders.textContent =
            pedidos.length;

    }


    /* =================================================
       TOTAL DE PRODUTOS COMPRADOS
    ================================================= */

    const quantidadeProdutos =
        pedidos.reduce(
            function (
                total,
                pedido
            ) {

                const quantidadePedido =
                    pedido.produtos.reduce(
                        function (
                            subtotal,
                            produto
                        ) {

                            return (
                                subtotal
                                +
                                produto.quantidade
                            );

                        },
                        0
                    );


                return (
                    total
                    +
                    quantidadePedido
                );

            },
            0
        );


    if (totalProductsBought) {

        totalProductsBought.textContent =
            quantidadeProdutos;

    }


    /* =================================================
       TOTAL GASTO
    ================================================= */

    const valorTotalGasto =
        pedidos.reduce(
            function (
                total,
                pedido
            ) {

                return (
                    total
                    +
                    Number(
                        pedido.total
                    )
                );

            },
            0
        );


    if (totalSpent) {

        totalSpent.textContent =
            formatarPreco(
                valorTotalGasto
            );

    }


    /* =================================================
       ÚLTIMO PEDIDO
    ================================================= */

    if (lastOrderContainer) {

        lastOrderContainer.innerHTML =
            "";


        if (pedidos.length === 0) {

            lastOrderContainer.innerHTML = `

                <p class="account-empty-message">

                    Nenhum pedido realizado ainda.

                </p>

            `;

        }

        else {

            const ultimoPedido =
                pedidos[
                    pedidos.length - 1
                ];


            lastOrderContainer.appendChild(
                criarCardPedido(
                    ultimoPedido
                )
            );

        }

    }


    /* =================================================
       LISTA COMPLETA DE PEDIDOS
    ================================================= */

    if (ordersList) {

        ordersList.innerHTML =
            "";


        if (pedidos.length === 0) {

            ordersList.innerHTML = `

                <p class="account-empty-message">

                    Você ainda não possui pedidos.

                </p>

            `;

        }

        else {

            /* Mais recente primeiro */
            const pedidosInvertidos =
                [...pedidos].reverse();


            pedidosInvertidos.forEach(
                function (pedido) {

                    ordersList.appendChild(
                        criarCardPedido(
                            pedido
                        )
                    );

                }
            );

        }

    }

}


/* =====================================================
   BOTÃO "VER TODOS"
===================================================== */

if (viewAllOrders) {

    viewAllOrders.addEventListener(
        "click",
        function () {

            mostrarSecaoConta(
                "accountOrders"
            );

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "Deseja sair da sua conta?"
                );


            if (!confirmar) {
                return;
            }


            localStorage.removeItem(
                "nextxpUsuario"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =====================================================
   INICIAR MINHA CONTA
===================================================== */

carregarMinhaConta();



/* =====================================================
   25. LINK MINHA CONTA NA HOME
===================================================== */

const homeAccountLink =
    document.querySelector(
        'a[href="pages/login.html"]'
    );


if (homeAccountLink) {

    const usuarioHome =
        localStorage.getItem(
            "nextxpUsuario"
        );


    if (usuarioHome) {

        try {

            const dadosUsuarioHome =
                JSON.parse(
                    usuarioHome
                );


            if (dadosUsuarioHome.logado) {

                homeAccountLink.href =
                    "pages/minha-conta.html";

            }

        }

        catch {

            console.log(
                "Erro ao carregar usuário."
            );

        }

    }

}
/* =====================================================
   26. CADASTRO DE USUÁRIO
===================================================== */

const registerForm =
    document.getElementById(
        "registerForm"
    );

const registerName =
    document.getElementById(
        "registerName"
    );

const registerEmail =
    document.getElementById(
        "registerEmail"
    );

const registerPassword =
    document.getElementById(
        "registerPassword"
    );

const registerConfirmPassword =
    document.getElementById(
        "registerConfirmPassword"
    );

const registerTerms =
    document.getElementById(
        "registerTerms"
    );

const showRegisterPassword =
    document.getElementById(
        "showRegisterPassword"
    );


/* =====================================================
   CARREGAR CONTAS
===================================================== */

function carregarContas() {

    const dados =
        localStorage.getItem(
            "nextxpContas"
        );


    if (!dados) {
        return [];
    }


    try {

        return JSON.parse(dados);

    }

    catch {

        return [];

    }

}


/* =====================================================
   SALVAR CONTAS
===================================================== */

function salvarContas(
    contas
) {

    localStorage.setItem(
        "nextxpContas",
        JSON.stringify(
            contas
        )
    );

}


/* =====================================================
   MOSTRAR / OCULTAR SENHA DO CADASTRO
===================================================== */

if (
    showRegisterPassword &&
    registerPassword
) {

    showRegisterPassword.addEventListener(
        "click",
        function () {

            const icone =
                showRegisterPassword.querySelector(
                    "i"
                );


            if (
                registerPassword.type ===
                "password"
            ) {

                registerPassword.type =
                    "text";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye"
                    );

                    icone.classList.add(
                        "fa-eye-slash"
                    );

                }

            }

            else {

                registerPassword.type =
                    "password";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye-slash"
                    );

                    icone.classList.add(
                        "fa-eye"
                    );

                }

            }

        }
    );

}


/* =====================================================
   CRIAR CONTA
===================================================== */

if (
    registerForm &&
    registerName &&
    registerEmail &&
    registerPassword &&
    registerConfirmPassword
) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nome =
                registerName.value.trim();


            const email =
                registerEmail.value
                    .trim()
                    .toLowerCase();


            const senha =
                registerPassword.value;


            const confirmarSenha =
                registerConfirmPassword.value;


            /* Nome */
            if (nome.length < 3) {

                alert(
                    "Digite seu nome completo."
                );

                registerName.focus();

                return;

            }


            /* E-mail */
            if (
                email === "" ||
                !email.includes("@") ||
                !email.includes(".")
            ) {

                alert(
                    "Digite um e-mail válido."
                );

                registerEmail.focus();

                return;

            }


            /* Senha */
            if (senha.length < 6) {

                alert(
                    "A senha precisa ter pelo menos 6 caracteres."
                );

                registerPassword.focus();

                return;

            }


            /* Confirmar senha */
            if (
                senha !==
                confirmarSenha
            ) {

                alert(
                    "As senhas não são iguais."
                );

                registerConfirmPassword.focus();

                return;

            }


            /* Termos */
            if (
                !registerTerms ||
                !registerTerms.checked
            ) {

                alert(
                    "Você precisa aceitar os termos para criar sua conta."
                );

                return;

            }


            const contas =
                carregarContas();


            /* Verificar e-mail duplicado */
            const contaExistente =
                contas.find(
                    function (conta) {

                        return (
                            conta.email
                                .toLowerCase()
                            ===
                            email
                        );

                    }
                );


            if (contaExistente) {

                alert(
                    "Já existe uma conta cadastrada com esse e-mail."
                );

                registerEmail.focus();

                return;

            }


            /* Criar conta */
            const novaConta = {

                id:
                    Date.now(),

                nome:
                    nome,

                email:
                    email,

                senha:
                    senha,

                dataCadastro:
                    new Date()
                        .toLocaleString(
                            "pt-BR"
                        )

            };


            contas.push(
                novaConta
            );


            salvarContas(
                contas
            );


            /* Deixar e-mail preenchido no login */
            localStorage.setItem(
                "nextxpEmailLembrado",
                email
            );


            alert(
                "Conta criada com sucesso!"
            );


            window.location.href =
                "login.html";

        }
    );

}
/* =====================================================
   27. RECUPERAÇÃO DE SENHA
===================================================== */

const recoveryEmailForm =
    document.getElementById(
        "recoveryEmailForm"
    );

const recoveryEmail =
    document.getElementById(
        "recoveryEmail"
    );

const newPasswordForm =
    document.getElementById(
        "newPasswordForm"
    );

const newPassword =
    document.getElementById(
        "newPassword"
    );

const confirmNewPassword =
    document.getElementById(
        "confirmNewPassword"
    );

const recoveryAccountEmail =
    document.getElementById(
        "recoveryAccountEmail"
    );

const showNewPassword =
    document.getElementById(
        "showNewPassword"
    );


/* Conta sendo recuperada */
let contaEmRecuperacao = null;


/* =====================================================
   PROCURAR CONTA PELO E-MAIL
===================================================== */

if (
    recoveryEmailForm &&
    recoveryEmail
) {

    recoveryEmailForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                recoveryEmail.value
                    .trim()
                    .toLowerCase();


            if (
                email === "" ||
                !email.includes("@")
            ) {

                alert(
                    "Digite um e-mail válido."
                );

                recoveryEmail.focus();

                return;

            }


            const contas =
                carregarContas();


            const contaEncontrada =
                contas.find(
                    function (conta) {

                        return (
                            conta.email
                                .toLowerCase()
                            ===
                            email
                        );

                    }
                );


            if (!contaEncontrada) {

                alert(
                    "Nenhuma conta foi encontrada com esse e-mail."
                );

                recoveryEmail.focus();

                return;

            }


            contaEmRecuperacao =
                contaEncontrada;


            /* Mostrar e-mail encontrado */
            if (recoveryAccountEmail) {

                recoveryAccountEmail.textContent =
                    "Conta encontrada: "
                    +
                    contaEncontrada.email;

            }


            /* Esconder primeira etapa */
            recoveryEmailForm.style.display =
                "none";


            /* Mostrar nova senha */
            if (newPasswordForm) {

                newPasswordForm.style.display =
                    "block";

            }

        }
    );

}


/* =====================================================
   MOSTRAR / OCULTAR NOVA SENHA
===================================================== */

if (
    showNewPassword &&
    newPassword
) {

    showNewPassword.addEventListener(
        "click",
        function () {

            const icone =
                showNewPassword.querySelector(
                    "i"
                );


            if (
                newPassword.type ===
                "password"
            ) {

                newPassword.type =
                    "text";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye"
                    );

                    icone.classList.add(
                        "fa-eye-slash"
                    );

                }

            }

            else {

                newPassword.type =
                    "password";


                if (icone) {

                    icone.classList.remove(
                        "fa-eye-slash"
                    );

                    icone.classList.add(
                        "fa-eye"
                    );

                }

            }

        }
    );

}


/* =====================================================
   SALVAR NOVA SENHA
===================================================== */

if (
    newPasswordForm &&
    newPassword &&
    confirmNewPassword
) {

    newPasswordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!contaEmRecuperacao) {

                alert(
                    "Nenhuma conta selecionada para recuperação."
                );

                return;

            }


            const senhaNova =
                newPassword.value;


            const confirmarSenhaNova =
                confirmNewPassword.value;


            if (
                senhaNova.length < 6
            ) {

                alert(
                    "A nova senha precisa ter pelo menos 6 caracteres."
                );

                newPassword.focus();

                return;

            }


            if (
                senhaNova !==
                confirmarSenhaNova
            ) {

                alert(
                    "As senhas não são iguais."
                );

                confirmNewPassword.focus();

                return;

            }


            const contas =
                carregarContas();


            const indiceConta =
                contas.findIndex(
                    function (conta) {

                        return (
                            conta.id ===
                            contaEmRecuperacao.id
                        );

                    }
                );


            if (
                indiceConta === -1
            ) {

                alert(
                    "Não foi possível localizar a conta."
                );

                return;

            }


            /* Atualizar senha */
            contas[indiceConta].senha =
                senhaNova;


            salvarContas(
                contas
            );


            /* Preencher e-mail no login */
            localStorage.setItem(
                "nextxpEmailLembrado",
                contaEmRecuperacao.email
            );


            alert(
                "Senha alterada com sucesso!"
            );


            window.location.href =
                "login.html";

        }
    );

}
/* =====================================================
   28. DETALHES DO PEDIDO
===================================================== */

const detailsOrderNumber =
    document.getElementById(
        "detailsOrderNumber"
    );

const detailsOrderDate =
    document.getElementById(
        "detailsOrderDate"
    );

const detailsProducts =
    document.getElementById(
        "detailsProducts"
    );

const detailsCustomerName =
    document.getElementById(
        "detailsCustomerName"
    );

const detailsStreet =
    document.getElementById(
        "detailsStreet"
    );

const detailsNeighborhood =
    document.getElementById(
        "detailsNeighborhood"
    );

const detailsCity =
    document.getElementById(
        "detailsCity"
    );

const detailsState =
    document.getElementById(
        "detailsState"
    );

const detailsCep =
    document.getElementById(
        "detailsCep"
    );

const detailsComplement =
    document.getElementById(
        "detailsComplement"
    );

const detailsComplementContainer =
    document.getElementById(
        "detailsComplementContainer"
    );

const detailsSubtotal =
    document.getElementById(
        "detailsSubtotal"
    );

const detailsDiscount =
    document.getElementById(
        "detailsDiscount"
    );

const detailsShipping =
    document.getElementById(
        "detailsShipping"
    );

const detailsTotal =
    document.getElementById(
        "detailsTotal"
    );

const detailsPayment =
    document.getElementById(
        "detailsPayment"
    );

const detailsEmail =
    document.getElementById(
        "detailsEmail"
    );


/* =====================================================
   PROCURAR PEDIDO SELECIONADO
===================================================== */

function carregarPedidoSelecionado() {

    const numeroPedido =
        localStorage.getItem(
            "nextxpPedidoSelecionado"
        );


    if (!numeroPedido) {

        return null;

    }


    const pedidos =
        carregarPedidos();


    return pedidos.find(
        function (pedido) {

            return (
                pedido.numero ===
                numeroPedido
            );

        }
    ) || null;

}


/* =====================================================
   MOSTRAR DETALHES DO PEDIDO
===================================================== */

function mostrarDetalhesPedido() {

    /* Só executar nesta página */
    if (!detailsOrderNumber) {

        return;

    }


    const pedido =
        carregarPedidoSelecionado();


    if (!pedido) {

        detailsOrderNumber.textContent =
            "Pedido não encontrado";


        if (detailsProducts) {

            detailsProducts.innerHTML = `

                <p class="details-empty">

                    Não foi possível encontrar
                    este pedido.

                </p>

            `;

        }


        return;

    }


    /* =================================================
       CABEÇALHO
    ================================================= */

    detailsOrderNumber.textContent =
        pedido.numero;


    if (detailsOrderDate) {

        detailsOrderDate.textContent =
            pedido.data;

    }


    /* =================================================
       PRODUTOS
    ================================================= */

    if (detailsProducts) {

        detailsProducts.innerHTML =
            "";


        pedido.produtos.forEach(
            function (produto) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.classList.add(
                    "details-product-item"
                );


                const imagem =
                    caminhoImagemCarrinho(
                        produto.imagem
                    );


                item.innerHTML = `

                    <img
                        src="${imagem}"
                        alt="${produto.nome}"
                    >


                    <div
                        class="details-product-info"
                    >

                        <strong>
                            ${produto.nome}
                        </strong>


                        <span>

                            Quantidade:
                            ${produto.quantidade}

                        </span>


                        <span>

                            Valor unitário:
                            ${formatarPreco(
                                produto.preco
                            )}

                        </span>

                    </div>


                    <div
                        class="details-product-price"
                    >

                        ${formatarPreco(
                            produto.preco
                            *
                            produto.quantidade
                        )}

                    </div>

                `;


                detailsProducts.appendChild(
                    item
                );

            }
        );

    }


    /* =================================================
       CLIENTE
    ================================================= */

    if (
        detailsCustomerName &&
        pedido.cliente
    ) {

        detailsCustomerName.textContent =
            pedido.cliente.nome
            ||
            "Cliente NextXP";

    }


    if (
        detailsEmail &&
        pedido.cliente
    ) {

        detailsEmail.textContent =
            pedido.cliente.email
            ||
            "-";

    }


    /* =================================================
       ENDEREÇO
    ================================================= */

    if (pedido.endereco) {

        if (detailsStreet) {

            detailsStreet.textContent =
                (
                    pedido.endereco.rua
                    ||
                    "-"
                )
                +
                ", "
                +
                (
                    pedido.endereco.numero
                    ||
                    "S/N"
                );

        }


        if (detailsNeighborhood) {

            detailsNeighborhood.textContent =
                pedido.endereco.bairro
                ||
                "-";

        }


        if (detailsCity) {

            detailsCity.textContent =
                pedido.endereco.cidade
                ||
                "-";

        }


        if (detailsState) {

            detailsState.textContent =
                pedido.endereco.estado
                ||
                "-";

        }


        if (detailsCep) {

            detailsCep.textContent =
                pedido.endereco.cep
                ||
                "-";

        }


        /* Complemento */
        if (
            pedido.endereco.complemento
            &&
            pedido.endereco.complemento.trim()
                !== ""
        ) {

            if (detailsComplement) {

                detailsComplement.textContent =
                    pedido.endereco.complemento;

            }


            if (
                detailsComplementContainer
            ) {

                detailsComplementContainer
                    .style.display =
                    "block";

            }

        }

        else {

            if (
                detailsComplementContainer
            ) {

                detailsComplementContainer
                    .style.display =
                    "none";

            }

        }

    }


    /* =================================================
       VALORES
    ================================================= */

    if (detailsSubtotal) {

        detailsSubtotal.textContent =
            formatarPreco(
                Number(
                    pedido.subtotal
                ) || 0
            );

    }


    if (detailsDiscount) {

        const desconto =
            Number(
                pedido.desconto
            ) || 0;


        if (desconto > 0) {

            detailsDiscount.textContent =
                "- "
                +
                formatarPreco(
                    desconto
                );

        }

        else {

            detailsDiscount.textContent =
                formatarPreco(0);

        }

    }


    if (detailsShipping) {

        const frete =
            Number(
                pedido.frete
            ) || 0;


        if (frete === 0) {

            detailsShipping.textContent =
                "GRÁTIS";

        }

        else {

            detailsShipping.textContent =
                formatarPreco(
                    frete
                );

        }

    }


    if (detailsTotal) {

        detailsTotal.textContent =
            formatarPreco(
                Number(
                    pedido.total
                ) || 0
            );

    }


    /* =================================================
       PAGAMENTO
    ================================================= */

    if (detailsPayment) {

        detailsPayment.textContent =
            formatarFormaPagamento(
                pedido.pagamento
            );

    }

}


/* =====================================================
   INICIAR DETALHES DO PEDIDO
===================================================== */

mostrarDetalhesPedido();
/* =====================================================
   29. PÁGINA DE FAVORITOS
===================================================== */

const favoritesList =
    document.getElementById(
        "favoritesList"
    );


const favoritesCount =
    document.getElementById(
        "favoritesCount"
    );


/* =====================================================
   ATUALIZAR CONTADOR
===================================================== */

function atualizarContadorFavoritos() {

    if (!favoritesCount) {
        return;
    }


    const favoritos =
        carregarFavoritos();


    favoritesCount.textContent =
        favoritos.length
        +
        (
            favoritos.length === 1
                ? " produto favorito"
                : " produtos favoritos"
        );

}


/* =====================================================
   RENDERIZAR FAVORITOS
===================================================== */

function renderizarFavoritos() {

    if (!favoritesList) {
        return;
    }


    const favoritos =
        carregarFavoritos();


    favoritesList.innerHTML =
        "";


    atualizarContadorFavoritos();


    /* Nenhum favorito */
    if (favoritos.length === 0) {

        favoritesList.innerHTML = `

            <div class="favorites-empty">

                <div class="favorites-empty-icon">

                    <i class="fa-regular fa-heart"></i>

                </div>


                <h2>
                    Nenhum favorito ainda
                </h2>


                <p>

                    Clique no coração dos produtos para
                    adicioná-los aos seus favoritos.

                </p>


                <a
                    href="../index.html#ofertas"
                    class="favorites-shop-button"
                >

                    <i class="fa-solid fa-gamepad"></i>

                    Ver produtos

                </a>

            </div>

        `;


        return;

    }


    favoritos.forEach(
        function (produto) {

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "favorite-product-card"
            );


            const imagem =
                caminhoImagemCarrinho(
                    produto.imagem
                );


            card.innerHTML = `

                <button
                    type="button"
                    class="remove-favorite-button"
                    data-id="${produto.id}"
                    title="Remover dos favoritos"
                >

                    <i class="fa-solid fa-heart"></i>

                </button>


                <div class="favorite-product-image">

                    <img
                        src="${imagem}"
                        alt="${produto.nome}"
                    >

                </div>


                <div class="favorite-product-info">

                    <h3>
                        ${produto.nome}
                    </h3>


                    <p class="favorite-product-description">

                        ${produto.descricao}

                    </p>


                    <strong class="favorite-product-price">

                        ${formatarPreco(
                            produto.preco
                        )}

                    </strong>


                    <span class="favorite-product-stock">

                        Em estoque

                    </span>


                    <button
                        type="button"
                        class="favorite-buy-button"
                        data-id="${produto.id}"
                    >

                        <i class="fa-solid fa-cart-shopping"></i>

                        ADICIONAR AO CARRINHO

                    </button>

                </div>

            `;


            favoritesList.appendChild(
                card
            );

        }
    );


    adicionarEventosPaginaFavoritos();

}


/* =====================================================
   EVENTOS DA PÁGINA FAVORITOS
===================================================== */

function adicionarEventosPaginaFavoritos() {

    const botoesRemover =
        document.querySelectorAll(
            ".remove-favorite-button"
        );


    const botoesAdicionar =
        document.querySelectorAll(
            ".favorite-buy-button"
        );


    /* Remover favorito */
    botoesRemover.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const id =
                        botao.dataset.id;


                    let favoritos =
                        carregarFavoritos();


                    favoritos =
                        favoritos.filter(
                            function (produto) {

                                return (
                                    produto.id !==
                                    id
                                );

                            }
                        );


                    salvarFavoritos(
                        favoritos
                    );


                    renderizarFavoritos();

                }
            );

        }
    );


    /* Adicionar favorito ao carrinho */
    botoesAdicionar.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const id =
                        botao.dataset.id;


                    const favoritos =
                        carregarFavoritos();


                    const favorito =
                        favoritos.find(
                            function (produto) {

                                return (
                                    produto.id ===
                                    id
                                );

                            }
                        );


                    if (!favorito) {
                        return;
                    }


                    const carrinho =
                        carregarCarrinho();


                    const produtoExistente =
                        carrinho.find(
                            function (produto) {

                                return (
                                    produto.id ===
                                    favorito.id
                                );

                            }
                        );


                    if (produtoExistente) {

                        produtoExistente.quantidade++;

                    }

                    else {

                        carrinho.push({

                            id:
                                favorito.id,

                            nome:
                                favorito.nome,

                            descricao:
                                favorito.descricao,

                            preco:
                                favorito.preco,

                            imagem:
                                favorito.imagem,

                            quantidade:
                                1

                        });

                    }


                    salvarCarrinho(
                        carrinho
                    );


                    alert(
                        favorito.nome
                        +
                        " foi adicionado ao carrinho!"
                    );

                }
            );

        }
    );

}


/* =====================================================
   INICIAR FAVORITOS
===================================================== */

if (favoritesList) {

    renderizarFavoritos();

}
/* =====================================================
   30. CATÁLOGO DE PRODUTOS
===================================================== */

const catalogSearch =
    document.getElementById(
        "catalogSearch"
    );

const catalogProductsGrid =
    document.getElementById(
        "catalogProductsGrid"
    );

const catalogResultsCount =
    document.getElementById(
        "catalogResultsCount"
    );

const catalogOrder =
    document.getElementById(
        "catalogOrder"
    );

const clearCatalogFilters =
    document.getElementById(
        "clearCatalogFilters"
    );

const catalogEmpty =
    document.getElementById(
        "catalogEmpty"
    );

const catalogCategoryFilters =
    document.querySelectorAll(
        'input[name="category"]'
    );

const catalogPriceFilters =
    document.querySelectorAll(
        'input[name="price"]'
    );


/* =====================================================
   PEGAR CARDS DO CATÁLOGO
===================================================== */

function pegarCardsCatalogo() {

    return Array.from(
        document.querySelectorAll(
            ".catalog-product-card"
        )
    );

}


/* =====================================================
   PEGAR FILTRO SELECIONADO
===================================================== */

function pegarRadioSelecionado(
    nome
) {

    const radio =
        document.querySelector(
            `input[name="${nome}"]:checked`
        );


    if (!radio) {
        return "todos";
    }


    return radio.value;

}


/* =====================================================
   VERIFICAR FAIXA DE PREÇO
===================================================== */

function produtoPassaFiltroPreco(
    preco,
    filtro
) {

    if (
        filtro === "todos"
    ) {

        return true;

    }


    if (
        filtro === "0-500"
    ) {

        return preco <= 500;

    }


    if (
        filtro === "500-1500"
    ) {

        return (
            preco >= 500 &&
            preco <= 1500
        );

    }


    if (
        filtro === "1500-3000"
    ) {

        return (
            preco >= 1500 &&
            preco <= 3000
        );

    }


    if (
        filtro === "3000+"
    ) {

        return preco > 3000;

    }


    return true;

}


/* =====================================================
   ORDENAR PRODUTOS
===================================================== */

function ordenarCatalogo(
    cards
) {

    if (!catalogOrder) {
        return cards;
    }


    const ordem =
        catalogOrder.value;


    const cardsOrdenados =
        [...cards];


    if (
        ordem === "price-low"
    ) {

        cardsOrdenados.sort(
            function (a, b) {

                return (
                    Number(a.dataset.price)
                    -
                    Number(b.dataset.price)
                );

            }
        );

    }


    else if (
        ordem === "price-high"
    ) {

        cardsOrdenados.sort(
            function (a, b) {

                return (
                    Number(b.dataset.price)
                    -
                    Number(a.dataset.price)
                );

            }
        );

    }


    else if (
        ordem === "name"
    ) {

        cardsOrdenados.sort(
            function (a, b) {

                return a.dataset.name.localeCompare(
                    b.dataset.name,
                    "pt-BR"
                );

            }
        );

    }


    return cardsOrdenados;

}


/* =====================================================
   APLICAR FILTROS
===================================================== */

function aplicarFiltrosCatalogo() {

    if (!catalogProductsGrid) {
        return;
    }


    const cards =
        pegarCardsCatalogo();


    const pesquisa =
        catalogSearch
            ? catalogSearch.value
                .trim()
                .toLowerCase()
            : "";


    const categoria =
        pegarRadioSelecionado(
            "category"
        );


    const faixaPreco =
        pegarRadioSelecionado(
            "price"
        );


    let encontrados = 0;


    const cardsOrdenados =
        ordenarCatalogo(
            cards
        );


    cardsOrdenados.forEach(
        function (card) {

            const nome =
                (
                    card.dataset.name
                    ||
                    ""
                ).toLowerCase();


            const categoriaProduto =
                card.dataset.category
                ||
                "";


            const preco =
                Number(
                    card.dataset.price
                ) || 0;


            const passaPesquisa =
                pesquisa === ""
                ||
                nome.includes(
                    pesquisa
                );


            const passaCategoria =
                categoria === "todos"
                ||
                categoriaProduto ===
                    categoria;


            const passaPreco =
                produtoPassaFiltroPreco(
                    preco,
                    faixaPreco
                );


            if (
                passaPesquisa &&
                passaCategoria &&
                passaPreco
            ) {

                card.style.display =
                    "";

                encontrados++;

            }

            else {

                card.style.display =
                    "none";

            }


            /*
                Reorganiza os cards
                conforme a ordenação.
            */
            catalogProductsGrid.appendChild(
                card
            );

        }
    );


    /* Contador */
    if (catalogResultsCount) {

        catalogResultsCount.textContent =
            encontrados
            +
            (
                encontrados === 1
                    ? " produto encontrado"
                    : " produtos encontrados"
            );

    }


    /* Nenhum resultado */
    if (catalogEmpty) {

        if (encontrados === 0) {

            catalogEmpty.style.display =
                "flex";

        }

        else {

            catalogEmpty.style.display =
                "none";

        }

    }

}


/* =====================================================
   PESQUISA EM TEMPO REAL
===================================================== */

if (catalogSearch) {

    catalogSearch.addEventListener(
        "input",
        aplicarFiltrosCatalogo
    );

}


/* =====================================================
   FILTRO DE CATEGORIA
===================================================== */

catalogCategoryFilters.forEach(
    function (radio) {

        radio.addEventListener(
            "change",
            aplicarFiltrosCatalogo
        );

    }
);


/* =====================================================
   FILTRO DE PREÇO
===================================================== */

catalogPriceFilters.forEach(
    function (radio) {

        radio.addEventListener(
            "change",
            aplicarFiltrosCatalogo
        );

    }
);


/* =====================================================
   ORDENAÇÃO
===================================================== */

if (catalogOrder) {

    catalogOrder.addEventListener(
        "change",
        aplicarFiltrosCatalogo
    );

}


/* =====================================================
   LIMPAR FILTROS
===================================================== */

if (clearCatalogFilters) {

    clearCatalogFilters.addEventListener(
        "click",
        function () {

            if (catalogSearch) {

                catalogSearch.value =
                    "";

            }


            const categoriaTodos =
                document.querySelector(
                    'input[name="category"][value="todos"]'
                );


            const precoTodos =
                document.querySelector(
                    'input[name="price"][value="todos"]'
                );


            if (categoriaTodos) {

                categoriaTodos.checked =
                    true;

            }


            if (precoTodos) {

                precoTodos.checked =
                    true;

            }


            if (catalogOrder) {

                catalogOrder.value =
                    "default";

            }


            aplicarFiltrosCatalogo();

        }
    );

}


/* =====================================================
   FAVORITOS DO CATÁLOGO
===================================================== */

function atualizarFavoritosCatalogo() {

    const botoes =
        document.querySelectorAll(
            ".catalog-favorite-button"
        );


    botoes.forEach(
        function (botao) {

            const card =
                botao.closest(
                    ".catalog-product-card"
                );


            if (!card) {
                return;
            }


            const id =
                card.dataset.id;


            const icone =
                botao.querySelector(
                    "i"
                );


            if (!icone) {
                return;
            }


            if (
                produtoEhFavorito(id)
            ) {

                icone.classList.remove(
                    "fa-regular"
                );

                icone.classList.add(
                    "fa-solid"
                );

                botao.style.color =
                    "#ff315f";

            }

            else {

                icone.classList.remove(
                    "fa-solid"
                );

                icone.classList.add(
                    "fa-regular"
                );

                botao.style.color =
                    "";

            }

        }
    );

}


/* =====================================================
   CLIQUE NO FAVORITO DO CATÁLOGO
===================================================== */

const catalogFavoriteButtons =
    document.querySelectorAll(
        ".catalog-favorite-button"
    );


catalogFavoriteButtons.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const card =
                    botao.closest(
                        ".catalog-product-card"
                    );


                if (!card) {
                    return;
                }


                const id =
                    card.dataset.id;


                const nomeElemento =
                    card.querySelector(
                        "h3"
                    );


                const descricaoElemento =
                    card.querySelector(
                        ".catalog-product-info p"
                    );


                const imagemElemento =
                    card.querySelector(
                        ".catalog-product-image img"
                    );


                const preco =
                    Number(
                        card.dataset.price
                    ) || 0;


                if (
                    !id ||
                    !nomeElemento
                ) {
                    return;
                }


                const nome =
                    nomeElemento.textContent
                        .trim();


                const descricao =
                    descricaoElemento
                        ? descricaoElemento
                            .textContent
                            .trim()
                        : "";


                const imagem =
                    imagemElemento
                        ? imagemElemento
                            .getAttribute(
                                "src"
                            )
                        : "";


                let favoritos =
                    carregarFavoritos();


                const indice =
                    favoritos.findIndex(
                        function (produto) {

                            return (
                                produto.id ===
                                id
                            );

                        }
                    );


                if (indice !== -1) {

                    favoritos.splice(
                        indice,
                        1
                    );

                }

                else {

                    favoritos.push({

                        id: id,

                        nome: nome,

                        descricao: descricao,

                        preco: preco,

                        imagem: imagem

                    });

                }


                salvarFavoritos(
                    favoritos
                );


                atualizarFavoritosCatalogo();

            }
        );

    }
);


/* =====================================================
   COMPRAR PELO CATÁLOGO
===================================================== */

const catalogBuyButtons =
    document.querySelectorAll(
        ".catalog-buy-button"
    );


catalogBuyButtons.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const card =
                    botao.closest(
                        ".catalog-product-card"
                    );


                if (!card) {
                    return;
                }


                const id =
                    card.dataset.id;


                const nomeElemento =
                    card.querySelector(
                        "h3"
                    );


                const descricaoElemento =
                    card.querySelector(
                        ".catalog-product-info p"
                    );


                const imagemElemento =
                    card.querySelector(
                        ".catalog-product-image img"
                    );


                const preco =
                    Number(
                        card.dataset.price
                    ) || 0;


                if (
                    !id ||
                    !nomeElemento
                ) {
                    return;
                }


                const nome =
                    nomeElemento.textContent
                        .trim();


                const descricao =
                    descricaoElemento
                        ? descricaoElemento
                            .textContent
                            .trim()
                        : "";


                const imagem =
                    imagemElemento
                        ? imagemElemento
                            .getAttribute(
                                "src"
                            )
                        : "";


                const carrinho =
                    carregarCarrinho();


                const produtoExistente =
                    carrinho.find(
                        function (produto) {

                            return (
                                produto.id ===
                                id
                            );

                        }
                    );


                if (produtoExistente) {

                    produtoExistente
                        .quantidade++;

                }

                else {

                    carrinho.push({

                        id: id,

                        nome: nome,

                        descricao:
                            descricao,

                        preco: preco,

                        imagem: imagem,

                        quantidade: 1

                    });

                }


                salvarCarrinho(
                    carrinho
                );


                alert(
                    nome
                    +
                    " foi adicionado ao carrinho!"
                );

            }
        );

    }
);
/* =====================================================
   ABRIR CATÁLOGO COM CATEGORIA DA URL
===================================================== */

function aplicarCategoriaDaUrl() {

    if (!catalogProductsGrid) {
        return;
    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const categoriaUrl =
        parametros.get(
            "categoria"
        );


    if (!categoriaUrl) {
        return;
    }


    const radioCategoria =
        document.querySelector(
            `input[name="category"][value="${categoriaUrl}"]`
        );


    if (radioCategoria) {

        radioCategoria.checked =
            true;

    }

}

/* =====================================================
   INICIAR CATÁLOGO
===================================================== */

if (catalogProductsGrid) {

    aplicarCategoriaDaUrl();

    aplicarFiltrosCatalogo();

    atualizarFavoritosCatalogo();

}
/* =====================================================
   31. PÁGINA INDIVIDUAL DO PRODUTO
===================================================== */


/* =====================================================
   TRANSFORMAR CARD DO CATÁLOGO EM PRODUTO
===================================================== */

function criarProdutoDoCardCatalogo(card) {

    const nomeElemento =
        card.querySelector("h3");

    const descricaoElemento =
        card.querySelector(
            ".catalog-product-info p"
        );

    const imagemElemento =
        card.querySelector(
            ".catalog-product-image img"
        );

    const categoriaElemento =
        card.querySelector(
            ".catalog-category"
        );

    const precoAntigoElemento =
        card.querySelector(
            ".catalog-old-price"
        );

    const parcelamentoElemento =
        card.querySelector(
            ".catalog-installments"
        );


    return {

        id:
            card.dataset.id,

        nome:
            nomeElemento
                ? nomeElemento.textContent.trim()
                : "Produto",

        descricao:
            descricaoElemento
                ? descricaoElemento.textContent.trim()
                : "",

        categoria:
            categoriaElemento
                ? categoriaElemento.textContent.trim()
                : "PRODUTO",

        preco:
            Number(
                card.dataset.price
            ) || 0,

        precoAntigo:
            precoAntigoElemento
                ? precoAntigoElemento.textContent.trim()
                : "",

        parcelamento:
            parcelamentoElemento
                ? parcelamentoElemento.textContent.trim()
                : "",

        imagem:
            imagemElemento
                ? imagemElemento.getAttribute("src")
                : ""

    };

}


/* =====================================================
   ABRIR PRODUTO AO CLICAR NO CARD
===================================================== */

const cardsCatalogoProduto =
    document.querySelectorAll(
        ".catalog-product-card"
    );


cardsCatalogoProduto.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function (event) {

                /*
                    Se clicar no coração
                    ou no botão COMPRAR,
                    não abre a página.
                */
                if (
                    event.target.closest(
                        "button"
                    )
                ) {

                    return;

                }


                const produto =
                    criarProdutoDoCardCatalogo(
                        card
                    );


                localStorage.setItem(
                    "nextxpProdutoSelecionado",
                    JSON.stringify(
                        produto
                    )
                );


                window.location.href =
                    "produto.html?id="
                    +
                    encodeURIComponent(
                        produto.id
                    );

            }
        );

    }
);


/* =====================================================
   ELEMENTOS DA PÁGINA DO PRODUTO
===================================================== */

const productDetailImage =
    document.getElementById(
        "productDetailImage"
    );

const productDetailCategory =
    document.getElementById(
        "productDetailCategory"
    );

const productDetailName =
    document.getElementById(
        "productDetailName"
    );

const productDetailDescription =
    document.getElementById(
        "productDetailDescription"
    );

const productDetailOldPrice =
    document.getElementById(
        "productDetailOldPrice"
    );

const productDetailPrice =
    document.getElementById(
        "productDetailPrice"
    );

const productDetailInstallments =
    document.getElementById(
        "productDetailInstallments"
    );

const productLongDescription =
    document.getElementById(
        "productLongDescription"
    );

const productQuantity =
    document.getElementById(
        "productQuantity"
    );

const productDecrease =
    document.getElementById(
        "productDecrease"
    );

const productIncrease =
    document.getElementById(
        "productIncrease"
    );

const productDetailBuy =
    document.getElementById(
        "productDetailBuy"
    );

const productDetailFavorite =
    document.getElementById(
        "productDetailFavorite"
    );


let quantidadeProdutoDetalhe = 1;

let produtoDetalheAtual = null;


/* =====================================================
   CARREGAR PRODUTO SELECIONADO
===================================================== */

function carregarProdutoDetalhe() {

    const dados =
        localStorage.getItem(
            "nextxpProdutoSelecionado"
        );


    if (!dados) {
        return null;
    }


    try {

        const produto =
            JSON.parse(dados);


        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const idUrl =
            parametros.get("id");


        /*
            Confirma se a URL corresponde
            ao produto salvo.
        */
        if (
            idUrl &&
            produto.id !== idUrl
        ) {

            return null;

        }


        return produto;

    }

    catch {

        return null;

    }

}


/* =====================================================
   MOSTRAR PRODUTO NA PÁGINA
===================================================== */

function mostrarProdutoDetalhe() {

    if (!productDetailName) {
        return;
    }


    const produto =
        carregarProdutoDetalhe();


    if (!produto) {

        productDetailName.textContent =
            "Produto não encontrado";


        if (productDetailDescription) {

            productDetailDescription.textContent =
                "Volte ao catálogo e selecione um produto.";

        }


        if (productDetailBuy) {

            productDetailBuy.disabled =
                true;

        }


        return;

    }


    produtoDetalheAtual =
        produto;


    /* Imagem */
    if (productDetailImage) {

        productDetailImage.src =
    caminhoImagemCarrinho(
        produto.imagem
    );
        productDetailImage.alt =
            produto.nome;

    }


    /* Categoria */
    if (productDetailCategory) {

        productDetailCategory.textContent =
            produto.categoria;

    }


    /* Nome */
    productDetailName.textContent =
        produto.nome;


    /* Descrição */
    if (productDetailDescription) {

        productDetailDescription.textContent =
            produto.descricao;

    }


    /* Preço antigo */
    if (productDetailOldPrice) {

        productDetailOldPrice.textContent =
            produto.precoAntigo;

    }


    /* Preço atual */
    if (productDetailPrice) {

        productDetailPrice.textContent =
            formatarPreco(
                produto.preco
            );

    }


    /* Parcelamento */
    if (productDetailInstallments) {

        productDetailInstallments.textContent =
            produto.parcelamento;

    }


    /* Descrição maior */
    if (productLongDescription) {

        productLongDescription.textContent =
            produto.nome
            +
            " é uma opção selecionada pela NextXP Gaming "
            +
            "para quem busca desempenho, qualidade e "
            +
            "uma experiência gamer completa. "
            +
            produto.descricao
            +
            ".";

    }


    atualizarFavoritoProdutoDetalhe();
    mostrarEspecificacoesProduto();
}


/* =====================================================
   QUANTIDADE
===================================================== */

function atualizarQuantidadeProdutoDetalhe() {

    if (productQuantity) {

        productQuantity.textContent =
            quantidadeProdutoDetalhe;

    }

}


if (productIncrease) {

    productIncrease.addEventListener(
        "click",
        function () {

            if (
                quantidadeProdutoDetalhe < 99
            ) {

                quantidadeProdutoDetalhe++;

                atualizarQuantidadeProdutoDetalhe();

            }

        }
    );

}


if (productDecrease) {

    productDecrease.addEventListener(
        "click",
        function () {

            if (
                quantidadeProdutoDetalhe > 1
            ) {

                quantidadeProdutoDetalhe--;

                atualizarQuantidadeProdutoDetalhe();

            }

        }
    );

}


/* =====================================================
   ADICIONAR AO CARRINHO
===================================================== */

if (productDetailBuy) {

    productDetailBuy.addEventListener(
        "click",
        function () {

            if (!produtoDetalheAtual) {

                alert(
                    "Produto não encontrado."
                );

                return;

            }


            const carrinho =
                carregarCarrinho();


            const produtoExistente =
                carrinho.find(
                    function (produto) {

                        return (
                            produto.id ===
                            produtoDetalheAtual.id
                        );

                    }
                );


            if (produtoExistente) {

                produtoExistente.quantidade +=
                    quantidadeProdutoDetalhe;

            }

            else {

                carrinho.push({

                    id:
                        produtoDetalheAtual.id,

                    nome:
                        produtoDetalheAtual.nome,

                    descricao:
                        produtoDetalheAtual.descricao,

                    preco:
                        produtoDetalheAtual.preco,

                    imagem:
                        produtoDetalheAtual.imagem,

                    quantidade:
                        quantidadeProdutoDetalhe

                });

            }


            salvarCarrinho(
                carrinho
            );


            alert(
                quantidadeProdutoDetalhe
                +
                "x "
                +
                produtoDetalheAtual.nome
                +
                " adicionado ao carrinho!"
            );

        }
    );

}


/* =====================================================
   FAVORITO DA PÁGINA DO PRODUTO
===================================================== */

function atualizarFavoritoProdutoDetalhe() {

    if (
        !productDetailFavorite ||
        !produtoDetalheAtual
    ) {

        return;

    }


    const icone =
        productDetailFavorite.querySelector(
            "i"
        );


    if (!icone) {
        return;
    }


    if (
        produtoEhFavorito(
            produtoDetalheAtual.id
        )
    ) {

        icone.classList.remove(
            "fa-regular"
        );

        icone.classList.add(
            "fa-solid"
        );

        productDetailFavorite.style.color =
            "#ff315f";

    }

    else {

        icone.classList.remove(
            "fa-solid"
        );

        icone.classList.add(
            "fa-regular"
        );

        productDetailFavorite.style.color =
            "";

    }

}


if (productDetailFavorite) {

    productDetailFavorite.addEventListener(
        "click",
        function () {

            if (!produtoDetalheAtual) {
                return;
            }


            let favoritos =
                carregarFavoritos();


            const indice =
                favoritos.findIndex(
                    function (produto) {

                        return (
                            produto.id ===
                            produtoDetalheAtual.id
                        );

                    }
                );


            /* Remover */
            if (indice !== -1) {

                favoritos.splice(
                    indice,
                    1
                );

            }

            /* Adicionar */
            else {

                favoritos.push({

                    id:
                        produtoDetalheAtual.id,

                    nome:
                        produtoDetalheAtual.nome,

                    descricao:
                        produtoDetalheAtual.descricao,

                    preco:
                        produtoDetalheAtual.preco,

                    imagem:
                        produtoDetalheAtual.imagem

                });

            }


            salvarFavoritos(
                favoritos
            );


            atualizarFavoritoProdutoDetalhe();

        }
    );

}


/* =====================================================
   INICIAR PÁGINA DO PRODUTO
===================================================== */

if (productDetailName) {

    mostrarProdutoDetalhe();

    atualizarQuantidadeProdutoDetalhe();

}
/* =====================================================
   32. ABRIR PRODUTOS DA HOME
===================================================== */

const homeProductCards =
    document.querySelectorAll(
        ".product-card"
    );


homeProductCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function (event) {

                /*
                    Não abrir a página se clicar
                    em Comprar ou Favoritar.
                */
                if (
                    event.target.closest("button")
                ) {

                    return;

                }


                const nomeElemento =
                    card.querySelector("h3");


                const descricaoElemento =
                    card.querySelector(
                        ".product-info p"
                    );


                const precoElemento =
                    card.querySelector(
                        ".product-price"
                    );


                const precoAntigoElemento =
                    card.querySelector(
                        ".old-price"
                    );


                const parcelamentoElemento =
                    card.querySelector(
                        ".installments"
                    );


                const imagemElemento =
                    card.querySelector(
                        ".product-image img"
                    );


                if (
                    !nomeElemento ||
                    !precoElemento
                ) {

                    return;

                }


                const nome =
                    nomeElemento
                        .textContent
                        .trim();


                const id =
                    card.dataset.id
                    ||
                    nome
                        .toLowerCase()
                        .replace(/\s+/g, "-");


                const produto = {

                    id: id,

                    nome: nome,

                    descricao:
                        descricaoElemento
                            ? descricaoElemento
                                .textContent
                                .trim()
                            : "",

                    categoria:
                        "PRODUTO GAMER",

                    preco:
                        converterPreco(
                            precoElemento.textContent
                        ),

                    precoAntigo:
                        precoAntigoElemento
                            ? precoAntigoElemento
                                .textContent
                                .trim()
                            : "",

                    parcelamento:
                        parcelamentoElemento
                            ? parcelamentoElemento
                                .textContent
                                .trim()
                            : "",

                    imagem:
                        imagemElemento
                            ? imagemElemento
                                .getAttribute("src")
                            : ""

                };


                /*
                    Salvar produto escolhido
                */
                localStorage.setItem(
                    "nextxpProdutoSelecionado",
                    JSON.stringify(produto)
                );


                /*
                    Abrir página do produto
                */
                window.location.href =
                    "pages/produto.html?id="
                    +
                    encodeURIComponent(
                        produto.id
                    );

            }
        );

    }
);
/* =====================================================
   33. ESPECIFICAÇÕES TÉCNICAS DO PRODUTO
===================================================== */

const productSpecifications =
    document.getElementById(
        "productSpecifications"
    );


/* =====================================================
   BANCO DE ESPECIFICAÇÕES
===================================================== */

const especificacoesProdutos = {

    "rtx-4070-super-12gb": {

        "Fabricante":
            "ASUS",

        "GPU":
            "NVIDIA GeForce RTX 4070 Super",

        "Memória":
            "12 GB GDDR6X",

        "Interface":
            "PCI Express 4.0",

        "Tecnologias":
            "Ray Tracing, DLSS e NVIDIA Reflex",

        "Refrigeração":
            "Sistema Dual Fan"

    },


    "monitor-aoc-27": {

        "Marca":
            "AOC",

        "Tamanho":
            "27 polegadas",

        "Resolução":
            "1920 × 1080 Full HD",

        "Taxa de atualização":
            "180 Hz",

        "Tempo de resposta":
            "1 ms",

        "Uso recomendado":
            "Gaming"

    },


    "redragon-kumara": {

        "Marca":
            "Redragon",

        "Tipo":
            "Teclado mecânico",

        "Iluminação":
            "RGB",

        "Formato":
            "Tenkeyless",

        "Conexão":
            "USB",

        "Uso":
            "Gaming"

    },


    "hyperx-cloud-ii": {

        "Marca":
            "HyperX",

        "Tipo":
            "Headset Gamer",

        "Áudio":
            "7.1 Surround",

        "Microfone":
            "Removível",

        "Conexão":
            "USB / P2",

        "Uso":
            "PC e consoles"

    },


    "kingston-nv2-1tb": {

        "Marca":
            "Kingston",

        "Capacidade":
            "1 TB",

        "Tipo":
            "SSD NVMe",

        "Interface":
            "M.2 PCIe",

        "Leitura":
            "Até 3500 MB/s",

        "Uso":
            "PC e notebook"

    },


    "acer-nitro-5": {

        "Marca":
            "Acer",

        "Linha":
            "Nitro 5",

        "Processador":
            "Intel Core i5",

        "Placa de vídeo":
            "NVIDIA GeForce RTX 3050",

        "Memória RAM":
            "16 GB",

        "Categoria":
            "Notebook Gamer"

    },


    "logitech-g502-hero": {

        "Marca":
            "Logitech",

        "Modelo":
            "G502 Hero",

        "Sensor":
            "HERO",

        "DPI":
            "Até 25.600 DPI",

        "Botões":
            "11 programáveis",

        "Iluminação":
            "RGB"

    },


    "asus-tuf-b550m": {

        "Marca":
            "ASUS",

        "Chipset":
            "AMD B550",

        "Socket":
            "AM4",

        "Memória":
            "DDR4",

        "Formato":
            "Micro ATX",

        "Armazenamento":
            "Suporte M.2"

    },


    "ryzen-7-5700x": {

        "Marca":
            "AMD",

        "Modelo":
            "Ryzen 7 5700X",

        "Núcleos":
            "8",

        "Threads":
            "16",

        "Socket":
            "AM4",

        "Categoria":
            "Processador Desktop"

    },


    "water-cooler-240-rgb": {

        "Tipo":
            "Water Cooler",

        "Radiador":
            "240 mm",

        "Fans":
            "2 × 120 mm",

        "Iluminação":
            "RGB",

        "Uso":
            "Refrigeração de processador"

    },


    "air-cooler-rgb": {

        "Tipo":
            "Air Cooler",

        "Fan":
            "120 mm",

        "Construção":
            "Dissipador em torre",

        "Iluminação":
            "RGB",

        "Uso":
            "Refrigeração de processador"

    },


    "kingston-fury-16gb": {

        "Marca":
            "Kingston",

        "Linha":
            "Fury",

        "Capacidade":
            "16 GB",

        "Tipo":
            "DDR4",

        "Frequência":
            "3200 MHz",

        "Uso":
            "Desktop"

    },


    "corsair-cv650": {

        "Marca":
            "Corsair",

        "Potência":
            "650 W",

        "Certificação":
            "80 Plus Bronze",

        "Categoria":
            "Fonte de alimentação",

        "Uso":
            "PC Gamer"

    },


    "kit-fans-rgb-3": {

        "Quantidade":
            "3 fans",

        "Tamanho":
            "120 mm",

        "Iluminação":
            "RGB",

        "Categoria":
            "Ventoinhas para gabinete"

    },


    "gabinete-nextxp-air": {

        "Tipo":
            "Mid Tower",

        "Lateral":
            "Vidro temperado",

        "Iluminação":
            "RGB",

        "Compatibilidade":
            "Setup Gamer",

        "Categoria":
            "Gabinete"

    },


    "jogo-midia-fisica": {

        "Formato":
            "Mídia física",

        "Plataforma":
            "PlayStation 5",

        "Tipo":
            "Jogo",

        "Conteúdo":
            "Disco físico"

    }

};


/* =====================================================
   MOSTRAR ESPECIFICAÇÕES
===================================================== */

function mostrarEspecificacoesProduto() {

    if (
        !productSpecifications ||
        !produtoDetalheAtual
    ) {

        return;

    }


    const especificacoes =
        especificacoesProdutos[
            produtoDetalheAtual.id
        ];


    productSpecifications.innerHTML =
        "";


    /* Produto sem ficha própria */
    if (!especificacoes) {

        productSpecifications.innerHTML = `

            <div class="product-specification-row">

                <div class="product-specification-name">
                    Produto
                </div>

                <div class="product-specification-value">
                    ${produtoDetalheAtual.nome}
                </div>

            </div>


            <div class="product-specification-row">

                <div class="product-specification-name">
                    Categoria
                </div>

                <div class="product-specification-value">
                    ${produtoDetalheAtual.categoria}
                </div>

            </div>

        `;


        return;

    }


    Object.entries(
        especificacoes
    ).forEach(
        function (
            [
                nome,
                valor
            ]
        ) {

            const linha =
                document.createElement(
                    "div"
                );


            linha.classList.add(
                "product-specification-row"
            );


            linha.innerHTML = `

                <div
                    class="product-specification-name"
                >
                    ${nome}
                </div>


                <div
                    class="product-specification-value"
                >
                    ${valor}
                </div>

            `;


            productSpecifications.appendChild(
                linha
            );

        }
    );

}