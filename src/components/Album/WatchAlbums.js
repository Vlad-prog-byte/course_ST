import './WatchAlbums.css';
import FolderIcon from '@mui/icons-material/Folder';
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {DELETE_FOLDER, RENAME_FOLDER} from "../../Storage/Actions/action";
//max size childrensdsdgsdfsdfd - 20  символов


const WatchAlbums = () => {
    const navigate = useNavigate();
    const store = useSelector((state) => state);
    const dispatch = useDispatch();

    const [contextMenu, setContextMenu] = useState(null);
    const [idFolder, setIdFolder] = useState(null)

    const [open, setOpen] = useState(false);
    const [renameFolder, setRenameFolder] = useState("");

    const handleCloseRename = () => {
        setOpen(false);
        setContextMenu(null);
        //Делаем запрос
    }
    const handleChange = (event) => {
        setRenameFolder(event.target.value);
    }
    const handleRemove = (event) => {
        setContextMenu(null);
        dispatch({type: DELETE_FOLDER, payload: {id : idFolder}});
    }
    const handleRename = (event) => {
        setContextMenu(null);
        setOpen(true);
    };

    const handleRenameFolder = (event) => {
        if (renameFolder == "")
            return;
        setOpen(false);
        dispatch({type: RENAME_FOLDER, payload: {id: idFolder, name: renameFolder}});
    };
    const handleClose = () => {
        setContextMenu(null);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
        setIdFolder(event.currentTarget.id);
    };




    return (
        <div style={{maxWidth: "985px"}}>
            <Grid container
                  spacing={4}
            >
                {store.folders.map(item =>
                    <Grid item>
                        <Box p={4}>
                        <div className="cardFolder">
                            <FolderIcon id={item.id}
                                onContextMenu={handleContextMenu}
                                sx={{height: "130px", width: "130px", color: "blue", "&:hover": { color: "#9099f0" } }}
                                onClick={() => navigate(`/albums/${item.id}`)}
                            ></FolderIcon>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                        </div>
                        </Box>
                    </Grid>)
                }
            </Grid>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem sx={{fontSize: "20px"}} onClick={handleRemove}>Удалить</MenuItem>
                {/*<MenuItem sx={{fontSize: "20px"}} onClick={handleRename}>Переименовать</MenuItem>*/}
            </Menu>

            <div className="RenameFolder">
                <Dialog open={open} onClose={handleCloseRename}>
                    <DialogTitle sx={{textAlign: 'center'}}>Переименовать Папку</DialogTitle>
                    <DialogContent>
                        <FolderIcon sx={{height: "130px", width: "130px", color: "blue", mx: "auto"}}></FolderIcon>
                        <TextField
                            className="createfolder"
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Переименовать папку"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRename}>Отменить</Button>
                        <Button onClick={handleRenameFolder}>Переименовать папку</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}

export default WatchAlbums;
