const router = require("express").Router();
const Pokemon = require("../models/pokemon.model");
const createError = require("http-errors");
const { create } = require("domain");

router.get("/", async (req, res, next) => {
  try {
    const [pokemons] = await Pokemon.getPokemons()
    console.log(pokemons[0])
    res.status(200).json(pokemons)
  } catch (error) {
    next(createError(404, "not found"));
  }
});

router.post("/", async (req, res, next) => {
    console.log('????/SCRAPE POST ')
  try {
    if (
      !("name" in req.body) ||
      !("url" in req.body || !("price" in req.body))
    ) {
      return res.status(400).json({ message: "need 3 keys : name, url ans price" });
    }
    const { name, url, price } = req.body;
    const ans = await Pokemon.saveUrl(name, url, price);
    if(!ans){
        return next(createError(400, 'bad request. name is UNIQUE !!'))
    }
    console.log("======>post ans : ", ans);
    res.status(201).json({
      message: "pokemon registered",
      insertedId: ans[0].insertId,
    });
  } catch (error) {
    console.log("error : ", error);
    next(error);
  }
});

router.get("/next", async (req, res, next) => {
  try {
    const firstPokemonFound = await Pokemon.getFirstWaitingPokemon();
    if (!firstPokemonFound) {
      res.status(400).json({ message: "no pokemon to analyse" });
    }
    res.status(200).json({ pokemon: firstPokemonFound });
  } catch (error) {
    next(error);
  }
});

router.post("/next/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("==>ID : ", id);
    console.log("==>DATA : ", data);
    const pokemon = new Pokemon();
    const updatedPokemon = await pokemon.updateDescriptionAndStockWithId(
      id,
      data
    );
    console.log("==> updatedPokemon", updatedPokemon);
    if (!updatedPokemon) {
      res.status(400).json({ message: "oups, something went wrong" });
    }
    res.status(201).json({ message: "updated" });
  } catch (error) {
    next(error);
  }
});

router.get("/url", async (req, res, next) => {
  try {
    const { pokemonUrl } = req.body;
    const [foundPokemon] = await Pokemon.getPokemonByUrl(pokemonUrl);
  } catch (error) {}
});

router.delete('/:name', async (req,res, next)=>{
    try {
        const ans = await Pokemon.deletePokemonByName(req.params.name)
        res.status(200).json({message : "pokemon deleted"})
    } catch (error) {
        
    }
})

module.exports = router;
