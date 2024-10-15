// data dari req.user -> ambil data ke role 
// data data akses. -> data acces
// maka perlu dibuatkan function 

const accessModel = require("../models/access");
const access = new accessModel();

async function rbac(menu, accessParam) {
    return async (req, res, next) => {
        const roleId = req.user.roleId
        if (roleId === 1) next()
        // SELECT * FROM access a
        // JOIN menu m on a.menu_id = m.id
        // where a.roleId = 1 AND grant = {[$accessParam] : true } AND m.name = $menu
        // price >=
        // price 
        const accessByRole = await access.getOne({
            where: {
                roleId,
                grant: {
                    equals: {
                        [accessParam]: true
                    }
                }
            },
            include: {
                menu: {
                    where: {
                        name: menu
                    }
                }
            }
        });
        console.log(accessByRole)
        if (!accessByRole) next(new ValidationError('Forbidden'))
        next()
    }

}

module.exports = rbac;
