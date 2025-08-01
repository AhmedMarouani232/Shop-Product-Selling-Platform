import React, { useEffect, useState } from "react";
import verifyAuth from "../components/VerifyAuth";
import ContainerContent from "../components/ContainerContent";
import { frFR } from '@mui/x-data-grid/locales';
import SideBar from "../components/SideBar";
import ToggleButton from "../components/ToggleButton";
import { getDevisPdf, getDevis } from "../app/services/DevisServices";
import * as FaIcons from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbarExport, GridToolbarFilterButton, GridToolbarContainer, GridToolbarColumnsButton} from "@mui/x-data-grid";
import ContainerButtons from "../components/ContainerButtons";
import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

// Define color theme
const themeColor = '#C7B299';
const themeColorLight = '#E0D6C9';
const themeColorDark = '#A89A80';
const textColor = '#333333';
const backgroundColor = '#F8F5F0';

const DownloadButton = styled.button`
  margin-left: 10%;
  background-color: #fff;
  color: ${themeColor}!important;
  border: 1px solid ${themeColor}!important;
  border-radius: 4px;
  padding: 5px 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${themeColor}!important;
    border-color: ${themeColor}!important;
    color: white!important;
  }
`;

const MesDevis = () => {
  const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

    body {
      font-family: 'Montserrat';
      background-color: ${backgroundColor};
    }

    .MuiDataGrid-root {
      border: none !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .MuiDataGrid-columnHeaders {
      background-color: ${themeColor};
      color: white;
      font-weight: 700;
      border-radius: 0;
    }

    .MuiDataGrid-row {
      &:nth-of-type(even) {
        background-color: ${backgroundColor};
      }
      &:hover {
        background-color: ${themeColorLight};
      }
    }

    .MuiDataGrid-cell {
      border-bottom: 1px solid ${themeColorLight};
      color: ${textColor};
    }

    .MuiDataGrid-footerContainer {
      border-top: 1px solid ${themeColorLight};
      background-color: ${backgroundColor};
    }

    .MuiTablePagination-root {
      color: ${textColor};
    }

    .MuiCheckbox-root {
      color: ${themeColor} !important;
    }

    .MuiDataGrid-selectedRowCount {
      color: ${textColor};
    }
  `;

    const dispatch = useDispatch();

    const columns = [
      {
        field: "date",
        headerName: "Date",
        flex: 0.15,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.date ? new Date(cellValues.row.date).toLocaleString(
              'fr-FR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }
          ): ''}
          </div>
        ),
      },
      {
        field: "devis_reference",
        headerName: "Référence Estimation",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.devis_reference}
          </div>
        ),
      },
      {
        field: "recipient_name",
        headerName: "Client",
        flex: 0.2,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.recipient_name}
          </div>
        ),
      },
      {
        field: "recipient_email",
        headerName: "Email",
        flex: 0.2,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.recipient_email}
          </div>
        ),
      },
      {
        field: "recipient_phone",
        headerName: "Téléphone",
        flex: 0.2,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.recipient_phone}
          </div>
        ),
      },
      {
        field: "address",
        headerName: "Adresse",
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.address}
          </div>
        ),
      },
      {
        field: "city",
        headerName: "Ville",
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.city}
          </div>
        ),
      },
      {
        field: "postcode",
        headerName: "Code Postal",
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.postcode}
          </div>
        ),
      },
      {
        field: "montant_ttc",
        headerName: "Montant Total TTC(€)",
        flex: 0.15,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.montant_ttc ? ` ${cellValues.row.montant_ttc.toFixed(2)} €` : " 0.00€"}
          </div>
        ),
      },
      {
        field: "devis_status",
        headerName: "Statut",
        flex: 0.15,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: 
              cellValues.row.devis_status === 'Signé' ? '#4CAF50' :
              cellValues.row.devis_status === 'Refusé' ? '#F44336' :
              cellValues.row.devis_status === 'En attente' ? '#FFC107' :
              themeColorLight,
            color: 
              cellValues.row.devis_status === 'Signé' ? 'white' :
              cellValues.row.devis_status === 'Refusé' ? 'white' :
              cellValues.row.devis_status === 'En attente' ? 'black' :
              textColor,
            fontWeight: '500'
          }}>
            {cellValues.row.devis_status}
          </div>
        ),
      },
      {
        field: "devis_status_start_date",
        headerName: "Dernier Statut",
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.devis_status_start_date ? new Date(cellValues.row.devis_status_start_date).toLocaleString(
              'fr-FR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }
          ): ''}
          </div>
        ),
      },
      {
        field: "welcome_call_start",
        headerName: "Date RDV Welcome Call",
        flex: 0.2,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.welcome_call_start ? new Date(cellValues.row.welcome_call_start).toLocaleString(
              'fr-FR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              hour12: false
            }
          ): ''}
          </div>
        ),
      },
      {
        field: "installation_date",
        headerName: "Date Installation",
        flex: 0.2,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.installation_date? new Date(cellValues.row.installation_date).toLocaleString(
              'fr-FR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }
          ): ''}
          </div>
        ),
      },
      {
        field: "signature_date",
        headerName: "Date Signature",
        flex: 0.3,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => (
          <div>
            {cellValues.row.signature_date ? new Date(cellValues.row.signature_date).toLocaleDateString(): ''}
          </div>
        ),
      },
      {
        field: "telecharger",
        headerName: "Télécharger",
        width: 120,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <DownloadButton onClick={() => handleDownload(params.row.devis_reference)}>
            <FaIcons.FaFilePdf style={{ fontSize: '28px'}} /> 
          </DownloadButton>
        ),
      },
    ];

    const handleDownload = async (ref) => {
      try {
        dispatch(getDevisPdf(ref));
      } catch (error) {
        console.error("Impossible de télécharger le PDF avec cette référence", ref);
      }
    };
    
    const first_name = useSelector((state) => state.user.first_name);
    const last_name = useSelector((state) => state.user.last_name);
    const today = new Date();

    const formatDate = (today) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return today.toLocaleDateString('fr-FR', options).replace(/\./g, '');
    };
    const formattedDatefunc = formatDate(today);

    useEffect(() => {
      dispatch(getDevis());
    }, [dispatch]);
    
    const CustomToolbar = ({ first_name, last_name, formattedDatefunc }) => {
      return (
        <GridToolbarContainer style={{
          backgroundColor: backgroundColor,
          padding: '10px',
          borderBottom: `1px solid ${themeColorLight}`
        }}>
          <div className="buttonsLeft" style={{ alignItems: "center", display: 'flex', gap: '10px' }}>
            <GridToolbarColumnsButton style={{
              color: themeColor,
              border: `1px solid ${themeColor}`,
              '&:hover': {
                backgroundColor: themeColorLight
              }
            }}/>
            <GridToolbarExport
              style={{
                color: themeColor,
                border: `1px solid ${themeColor}`,
                '&:hover': {
                  backgroundColor: themeColorLight
                }
              }}
              csvOptions={{
                allColumns: true, 
                fileName: `ahmed-${first_name}-${last_name}-${formattedDatefunc}`, 
                utf8WithBom: true,
                fields: ["date", 
                  "devis_reference", 
                  "recipient_name", 
                  "recipient_email", 
                  "recipient_phone", 
                  "address", 
                  "city", 
                  "postcode", 
                  "montant_ttc", 
                  "devis_status", 
                  "devis_status_start_date",
                  "welcome_call_start", 
                  "signature_date",
                  "installation_date"]
              }}
            />
            <GridToolbarFilterButton style={{
              color: themeColor,
              border: `1px solid ${themeColor}`,
              '&:hover': {
                backgroundColor: themeColorLight
              }
            }}/>
          </div>
        </GridToolbarContainer>
      );
    };

    const [checkboxSelection, setCheckboxSelection] = React.useState(true);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]); 
    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
      recipient_email: false,
      recipient_phone: false,
      address: false,
      city: false,
      postcode: false
    });
    const devisData = useSelector((state) => state.devis.devisData);

    if (!devisData) {
      return (
        <>
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <SideBar isOpen={isSideBarOpen} />
          <DataGrid
            rows={[]}
            columns={columns}
          />
        </>
      );
    } else {
      return (
        <>
          <GlobalStyle />
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <SideBar isOpen={isSideBarOpen} />
          <ContainerContent style={{ backgroundColor: backgroundColor }}>
              <DataGrid
                  headerHeight={50}
                  rowHeight={50}
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids)
                    const selectedRows = devisData.devis_list.filter((row) =>
                      selectedIDs.has(row.id)
                    )
                    setSelectedRow(selectedRows)
                  }}
                  pagination
                  rowsPerPageOptions={[5, 25, 50, 100]}
                  checkboxSelection={checkboxSelection}
                  disableSelectionOnClick={true}
                  localeText={
                  frFR.components.MuiDataGrid.defaultProps.localeText
                  }
                  slots={{
                    toolbar: () => (<CustomToolbar 
                      first_name={first_name} 
                      last_name={last_name} 
                      formattedDatefunc={formattedDatefunc}
                      />),
                  }}
                  rowSpacingType="margin"
                  initialState={{
                  sorting: {
                      sortModel: [{ field: "devis_reference", sort: "asc" }]
                  }
                  }}
                  disableColumnMenu={true}
                  sx={{
                  "& .MuiDataGrid-toolbarContainer": {
                    backgroundColor: backgroundColor,
                    padding: '10px',
                    borderBottom: `1px solid ${themeColorLight}`
                  },
                  "& .MuiButton-root": {
                    color: themeColor,
                    border: `1px solid ${themeColor}`,
                    '&:hover': {
                      backgroundColor: themeColorLight
                    }
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                  },
                  "& .MuiDataGrid-cellContent": {
                    fontSize: '0.875rem'
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: `1px solid ${themeColorLight}`
                  },
                  "& .MuiTablePagination-root": {
                    color: textColor
                  },
                  "& .MuiCheckbox-root": {
                    color: `${themeColor} !important`
                  },
                  "& .MuiDataGrid-selectedRowCount": {
                    color: textColor
                  },
                  "& .MuiDataGrid-row.Mui-selected": {
                    backgroundColor: `${themeColorLight} !important`,
                    '&:hover': {
                      backgroundColor: `${themeColor} !important`
                    }
                  }
                  }}
                  rows={devisData.devis_list}
                  columns={columns}
                  autoPageSize
                  columnVisibilityModel={columnVisibilityModel}
                  onColumnVisibilityModelChange={(newModel) =>
                    setColumnVisibilityModel(newModel)
                  }
              />
              </ContainerContent>
          </>
      );
    }
}

export default verifyAuth(MesDevis);