import React from 'react'
import { CResultTableStyled } from './CResultTable.styled'
import { DataTable } from 'primereact/datatable';

export default function CResultTable({ children, value, selectionMode, dataKey, selectedData, emptyMessage, onSelectionChange, loading }) {
  return (
    <CResultTableStyled>
        <DataTable emptyMessage={emptyMessage} value={value} loading={loading} selectionMode={selectionMode} dataKey={dataKey} selection={selectedData} onSelectionChange={onSelectionChange}>
          { children }
        </DataTable>
    </CResultTableStyled>
  )
}
