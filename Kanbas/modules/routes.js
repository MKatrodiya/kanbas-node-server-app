import * as dao from "./dao.js";

function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findAllModules(cid);
    res.send(modules);
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const module = await dao.createModule(cid, req.body);
    res.send(module);
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const status = await dao.deleteModule(mid);
    res.send(status);
  });

  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const status = await dao.updateModule(mid, req.body);
    res.send(status);
  });
}
export default ModuleRoutes;
