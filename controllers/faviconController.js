const evitarChamadaFavicon = ((req, res) => {
    console.log('Chamada favicon');
    res.status(204);
    res.end();
});


module.exports = { evitarChamadaFavicon }