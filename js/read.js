/**
 * Sélectionner et afficher les vinyles
 */

async function readVinyles() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/Jmini00/vinyles-collection-API/vinyles');
        const vinyles = await response.json();

        // Trier les vinyles par nom d'artiste (ordre alphabétique)
        vinyles.sort((a, b) => a.artist.localeCompare(b.artist));

            const grid = document.getElementById('vinyles-grid');
            const template = document.getElementById('vinyles-template').content;
            const ul = document.querySelector('section ul');
            const ulNav = document.querySelector('#collapseExample ul')

            // Exécute le code dans X millisecondes
            setTimeout(() => {
                // Masquer le loader
                document.querySelector('.loader').classList.add('hide')
                grid.style.animation = "fadeIn 3s";
                ul.style.animation = "fadeIn 2s";
                
        vinyles.forEach(vinyle => {
            const vinyleNode = document.importNode(template, true)
            vinyleNode.querySelector('.myCard').id = `vinyle-${vinyle.id}`
            vinyleNode.querySelector('.card-img-top').src = vinyle.picture
            vinyleNode.querySelector('.card-img-top').alt = `Pochette Album ${vinyle.album}`
            vinyleNode.querySelector('.card-img-top').title = `Album ${vinyle.album}` 
            vinyleNode.querySelector('.card-title').textContent = `Album : "${vinyle.album}"`
            vinyleNode.querySelector('.card-text-artist').textContent = `Artiste : ${vinyle.artist}`
            vinyleNode.querySelector('.card-text-year').textContent = `Sorti en ${vinyle.year}`
            //vinyleNode.querySelector('.vinyle').href = `vinyle.html?id=${vinyle.id}`

            // Ajouter un gestionnaire d'événement pour ouvrir la modale
            vinyleNode.querySelector('.myCard').addEventListener('click', () => openModal(vinyle));

            //const ul = document.querySelector('section ul')
            const li = document.createElement('li')
            li.innerHTML = `<a href="#vinyle-${vinyle.id}"><img src="assets/Vinyl-PNG-Transparent-Image.png" alt="${vinyle.album}" title="${vinyle.album}" width="40"></a>`

            const liNav = document.createElement('li') 
            liNav.innerHTML = `<a href="#vinyle-${vinyle.id}">${vinyle.artist} - Album "${vinyle.album}"</a>`

            grid.appendChild(vinyleNode)
            ul.appendChild(li)
            ulNav.appendChild(liNav)
        })
        // Lance le moteur de recherche une fois que les cartes sont générées
        searchVinyl();
    },3000)
    clearTimeout();

    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour ouvrir la modale
function openModal(vinyle) {
    const modal = document.getElementById('vinyle-modal');
    modal.querySelector('.modal-title').textContent = vinyle.album;
    modal.querySelector('.modal-artist').textContent = `Artiste : ${vinyle.artist}`;
    modal.querySelector('.modal-year').textContent = `Sorti en ${vinyle.year}`;
    modal.querySelector('.modal-img').src = vinyle.picture;
    modal.querySelector('.modal-description').textContent = vinyle.description || 'Pas de description disponible.';
    //modal.style.display = 'block';
    setTimeout(() => {
                // Masquer le loader
                modal.style.animation = "fadeIn .3s";
                modal.style.display = 'block';
                },300)
    clearTimeout();
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById('vinyle-modal');
    modal.style.display = 'none';
}

// Ajouter un écouteur pour fermer la modale en cliquant sur le bouton de fermeture
document.querySelector('.modal-close').addEventListener('click', closeModal);

// Ajouter un écouteur pour fermer la modale en cliquant en dehors
window.addEventListener('click', (event) => {
    const modal = document.getElementById('vinyle-modal');
    if (event.target === modal) {
        closeModal();
    }
});

readVinyles();

/**
 * Moteur de recherche par artiste
 */
function searchVinyl() {
    const search = document.getElementById('search');
    const vinyleCards = document.querySelectorAll('#vinyles-grid .myCard');

    search.addEventListener('input', () => {
        const query = search.value.toLowerCase().trim();

        vinyleCards.forEach(vinyleCard => {
            const artistName = vinyleCard.querySelector('.card-text-artist').textContent.toLowerCase();
            // Vérifie si l'artiste correspond à la recherche
            if (artistName.includes(query)) {
                vinyleCard.style.display = ''; // Affiche la carte
                //vinyleCard.classList.remove('hidden');
                //vinyleCard.classList.add('visible');
            } else {
                vinyleCard.style.display = 'none'; // Masque la carte
                //vinyleCard.classList.remove('visible');
                //vinyleCard.classList.add('hidden');
            }
        });
    });
}

// Appelez cette fonction après que les vinyles soient chargés
//searchVinyl();
