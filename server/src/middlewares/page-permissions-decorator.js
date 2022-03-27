import adminsData from '../data/admins-data.js';
import usersData from '../data/users-data.js';
import { userRole } from '../common/user-role.js';

export default async (req, res, next) => {
    
    let loadData = {};
    const pagesPermissions = await adminsData.getPagesPermissionsById(req.user.id);
    if (pagesPermissions && pagesPermissions.error) {
        return res.status(404).send(pagesPermissions.error);
    }
    const pagesArr = Object.keys(pagesPermissions);
    const allowedPages = pagesArr.filter(page => {
        if (pagesPermissions[page] == '1' && page != 'user_id') {
           return true;
        }
        return false;
    })

    const permissionsForEachPage = [];
    await Promise.all(allowedPages.map(async (pageName) => {
        const pagePermissions = await adminsData.getPagePermissionsByPage(pageName, req.user.id);

        if (pagePermissions && pagePermissions.error) {
            return res.status(404).send(pagePermissions.error);
        }
        const pagePermissionsArr = Object.keys(pagePermissions);
        const allowedOnPage = pagePermissionsArr.filter(allowThis => {
            if (pagePermissions[allowThis] == '1' && allowThis != 'user_id') {
               return true;
            }
            return false;
        })

        let tempObj = {};
        tempObj[pageName] = allowedOnPage;
        permissionsForEachPage.push( tempObj );
        }
    ));
    loadData.pagesPermissions = permissionsForEachPage;

    req.body.permissions = loadData;
    
    await next();
  };