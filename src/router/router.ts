import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";

const router = Router();

router.get("/heroes", (req: Request, res: Response) => {
  const query = `
    SELECT *
    FROM heroes;`;

  MySQL.query(query, (err: any, heroes: Object[]) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }

    if (!heroes) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "No result found",
        },
      });
    }

    res.json({
      ok: true,
      heroes,
    });
  });
});

router.get("/heroes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const escapedId = MySQL.escape(id);

  const query = `
    SELECT *
    FROM heroes
    WHERE id = ${escapedId};`;

  MySQL.query(query, (err: any, results: Object[]) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }

    if (!results) {
      return res.status(404).json({
        ok: false,
        error: {
          message: "No result found",
        },
      });
    }

    const heroe = results[0];

    res.json({
      ok: true,
      heroe,
    });
  });
});

export default router;
