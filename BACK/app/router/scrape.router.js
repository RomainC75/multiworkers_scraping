const router = require("express").Router();
const Pokemon = require("../models/pokemon.model");
const createError = require("http-errors");

router.get("/", async (req, res, next) => {
  try {
    const [pokemons] = await Pokemon.getPokemons();
    // console.log(pokemons[0])
    res.status(200).json(pokemons);
  } catch (error) {
    next(createError(404, "not found"));
  }
});

router.post("/", async (req, res, next) => {
  try {
    // if (
    //   !("name" in req.body) ||
    //   !("url" in req.body || !("price" in req.body))
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "need 3 keys : name, url ans price" });
    // }
    
    const ans = await Promise.all(
      req.body.map( (pokemon) => {
        return new Promise(async(resolve,reject)=>{
          try {
            const { name, url, price } = pokemon;
            const ans = await Pokemon.saveUrl(name, url, price);
            if (!ans) {
              resolve({error: name})
            }
            resolve(ans[0].insertId)
          } catch (error) {
            reject(error);
          }
        })
      })
    );

    res.status(201).json({
      message: "pokemon registered",
      insertedIds:   ans ,
    });

    const fullCount = await Pokemon.getEveryPokemonEntriesCount();
    global.io.emit("news", {
      hello: "news from the pokemon scraping field",
      fullCount,
    });
  } catch (error) {
    console.log("error : ", error);
    next(error);
  }
});

router.get("/next", async (req, res, next) => {
  try {
    const firstPokemonFound = await Pokemon.getFirstWaitingPokemon();
    const everyPokemonCount = await Pokemon.getEveryPokemonEntriesCount();

    if (!firstPokemonFound) {
      if (everyPokemonCount < 20) {
        return res.status(425).json({ message: "too early" });
      }
      return res.status(400).json({ message: "no pokemon to analyse" });
    }
    // console.log('==> FIrst pokemon found : ', firstPokemonFound)
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
    const preUpdatedPokemon = await pokemon.updateDescriptionAndStockWithId(
      id,
      data
    );
    console.log("==> preUpdatedPokemon", preUpdatedPokemon);
    if (!preUpdatedPokemon) {
      return res
        .status(422)
        .json({ message: "oups, something wrong in the request" });
    }
    res.status(201).json({ message: "updated", preUpdatedPokemon });
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

router.get("/name/:name", async (req, res, next) => {
  try {
    const pokemonName = req.params.name;
    const [[foundPokemon]] = await Pokemon.getPokemonByName(pokemonName);
    res.status(200).json(foundPokemon);
  } catch (error) {
    next(error);
  }
});

router.delete("/:name", async (req, res, next) => {
  try {
    const ans = await Pokemon.deletePokemonByName(req.params.name);
    res.status(200).json({ message: "pokemon deleted" });
  } catch (error) {}
});

module.exports = router;
