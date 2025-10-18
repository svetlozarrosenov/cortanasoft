'use client';
import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useLots } from './hooks';
import { findTableFields } from '@/utils/helpers';
import { useUserRole } from '../../companies/[id]/hooks';
import styles from '../../dashboard-grid.module.css';
import { useForm } from 'react-hook-form';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Lot {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: string;
  sku?: string;
  serialNumber?: string;
  expiryDate?: string;
  status: string;
}

export default function LotsPage() {
  const { lots: rowData } = useLots();
  const { userRole } = useUserRole();
  const [colDefs, setColDefs] = useState([]);

  const form = useForm({ mode: 'all' });
  
  useEffect(() => {
    if(userRole) {
      const table = findTableFields(userRole, "productsLotsSection", "productsLotsTable", 1)
 
      const modifiedColDefs = table?.map((col: any) => {
        const colDef: ColDef = {
          field: col.field || col.headerName,
          headerName: col.headerName,
          filter: col.filter || false,
          flex: col.flex || 1,
        };
      
        return colDef;
      });
      setColDefs(modifiedColDefs)
    }
  }, [userRole])

  return (
    <div className={styles.grid}>
      <div className={styles.head}>
        <h3 className={styles.title}>Партиди</h3>
      </div>
        <div className={styles.table}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
            }}
          />
        </div>
    </div>
  );
}