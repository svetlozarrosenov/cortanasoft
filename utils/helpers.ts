export const findTableFields = (userRole: any, sectionId: any, tableId: any) => {
    const section = userRole.permissions.find((permission: any) => permission.sectionId === sectionId);
    const table = section?.tables.find((table: any) => table.id === tableId)
  
    return table?.fields;
  }