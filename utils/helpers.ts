export const findTableFields = (userRole: any, sectionId: any, tableId: any, level = 0) => {
  let section: any= [];

  switch(level) {
    case 0:
      section = userRole?.permissions?.find((permission: any) => permission.sectionId === sectionId);
      break;
    case 1:
      userRole?.permissions?.find((permission: any) => permission?.children.find((childPermis: any) => {
        if(childPermis.sectionId  === sectionId) {
          section = childPermis;
        }
        return childPermis.sectionId  === sectionId}
      ));
      break;
  }

  const table = section?.tables?.find((table: any) => table.id === tableId)

  return table?.fields;
}