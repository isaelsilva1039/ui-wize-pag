

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Tooltip,
  Toolbar,
  Typography as MuiTypography,
  Popover,
  Button,
  Box,

} from "@mui/material";
import { Settings, Edit, Delete } from "@mui/icons-material";
import PropTypes from "prop-types";
import '../../styles/tabela/style.scss'

const EmpresaTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  title = "",
}) => {

  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem("visibleColumns");
    if (saved) {
      return JSON.parse(saved);
    } else {

      const initialVisibility = {};
      columns.forEach((col) => {
        initialVisibility[col.id] = col.visible !== undefined ? col.visible : true;
      });
      return initialVisibility;
    }
  });

  const [anchorEl, setAnchorEl] = useState(null);


  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);


  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "column-selector-popover" : undefined;


  const handleColumnToggle = (event) => {
    const { name, checked } = event.target;
    setVisibleColumns((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectAll = () => {
    const updated = { ...visibleColumns };
    columns.forEach((col) => {
      if (col.id !== "actions") {
        updated[col.id] = true;
      }
    });
    setVisibleColumns(updated);
  };

  const handleDeselectAll = () => {
    const updated = { ...visibleColumns };
    columns.forEach((col) => {
      if (col.id !== "actions") {
        updated[col.id] = false;
      }
    });
    setVisibleColumns(updated);
  };

  return (
    <TableContainer component={Paper}>

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 2,
          paddingRight: 1,
        }}
      >
        <MuiTypography variant="h6" component="div">
          {title}
        </MuiTypography>
        <Tooltip title="Selecionar Colunas">
          <IconButton onClick={handleOpenPopover}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper sx={{ padding: 2, minWidth: 200 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selecionar Colunas
          </Typography>
          <FormGroup>
            {columns.map((column) => (
              column.id !== "actions" && (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={visibleColumns[column.id]}
                      onChange={handleColumnToggle}
                      name={column.id}
                    />
                  }
                  label={column.label}
                />
              )
            ))}
          </FormGroup>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button size="small" onClick={handleSelectAll}>
              Selecionar Todas
            </Button>
            <Button size="small" onClick={handleDeselectAll}>
              Desselecionar Todas
            </Button>
          </Box>
        </Paper>
      </Popover>

      {/* Tabela */}
      <Table aria-label="tabela">
        <TableHead>
          <TableRow>
            {columns.map(
              (column) =>
                visibleColumns[column.id] && (
                  <TableCell key={column.id}>{column.label}</TableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body1">Nenhum registro encontrado.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  if (!visibleColumns[column.id]) return null;
                  if (column.id === "actions") {
                    return (
                      <TableCell key={column.id}>
                        {onEdit && (
                          <Tooltip title="Editar">
                            <IconButton
                              color="primary"
                              onClick={() => onEdit(item, index)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Remover">
                            <IconButton
                              color="error"
                              onClick={() => onDelete(item)}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id}>
                      {column.render ? column.render(item[column.id], item) : item[column.id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Definir as PropTypes para melhor validação das props
EmpresaTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      visible: PropTypes.bool,
      render: PropTypes.func, // Função opcional para customizar a renderização da célula
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func, // Função opcional para editar um item
  onDelete: PropTypes.func, // Função opcional para remover um item
  title: PropTypes.string, // Título opcional para a tabela
};

export default EmpresaTable;
