/**
 * Sélectionner et afficher les vinyles
 */

async function readVinyles() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/Jmini00/vinyles-collection-API/vinyles');
        const vinyles = await response.json();

        // Trier les vinyles par nom d'artiste (ordre alphabétique)
        //vinyles.sort((a, b) => a.artist.localeCompare(b.artist));

            const grid = document.getElementById('vinyles-grid');
            const template = document.getElementById('vinyles-template').content;
            const ul = document.querySelector('section ul');
            const ulNav = document.querySelector('#collapseExample ul')

            // Exécute le code dans X millisecondes
            setTimeout(() => {
                // Masquer le loader
                document.querySelector('.loader').classList.add('hide')
                grid.style.animation = "fadeIn 4s";
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

            //const ul = document.querySelector('section ul')
            const li = document.createElement('li')
            li.innerHTML = `<a href="#vinyle-${vinyle.id}"><img src="assets/Vinyl-PNG-Transparent-Image.png" alt="${vinyle.album}" title="${vinyle.album}" width="40"></a>`

            const liNav = document.createElement('li') 
            liNav.innerHTML = `<a href="#vinyle-${vinyle.id}">${vinyle.artist} - Album "${vinyle.album}"</a>`

            grid.appendChild(vinyleNode)
            ul.appendChild(li)
            ulNav.appendChild(liNav)
        })
    },3000)
    clearTimeout();

    } catch (error) {
        console.error('Erreur:', error);
    }
}

readVinyles();