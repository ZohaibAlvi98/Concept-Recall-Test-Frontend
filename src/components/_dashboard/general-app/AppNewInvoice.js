import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';

import {
    Box,
    Menu,
    Card,
    Table,
    Divider,
    MenuItem,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Typography,
    CardHeader,
    TableContainer
} from '@material-ui/core';
// utils
import mockData from '../../../utils/mock-data';
import moment from 'moment';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function MoreMenuButton() {
    const menuRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <>
                <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
                    <Icon icon={moreVerticalFill} width={20} height={20} />
                </MIconButton>
            </>

            <Menu
                open={open}
                anchorEl={menuRef.current}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem>
                    <Icon icon={downloadFill} width={20} height={20} />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Download
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Icon icon={printerFill} width={20} height={20} />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Print
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Icon icon={shareFill} width={20} height={20} />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Share
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Icon icon={archiveFill} width={20} height={20} />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Archive
                    </Typography>
                </MenuItem>

                <Divider />
                <MenuItem sx={{ color: 'error.main' }}>
                    <Icon icon={trash2Outline} width={20} height={20} />
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Delete
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
}

export default function AppNewInvoice(props) {
    const { data } = props;

    return (
        <Card>
            <CardHeader title="Top 10 Total User Earnings" sx={{ mb: 3 }} />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Coins</TableCell>
                                <TableCell>BOWS</TableCell>
                                <TableCell>Total Earned</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.coinsEarned}</TableCell>
                                    <TableCell>{row.bowsEarned}</TableCell>
                                    <TableCell>
                                        {row.totalEarnings}
                                        {/* <Label
                                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                            color={
                                                (row.status === 'in_progress' && 'warning') ||
                                                (row.status === 'out_of_date' && 'error') ||
                                                'success'
                                            }
                                        >
                                            {sentenceCase(row.status)}
                                        </Label> */}
                                    </TableCell>
                                    <TableCell align="left">
                                        {moment(row.created_at).format('YYYY-MM-DD')}
                                        {/* <MoreMenuButton /> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>

            <Divider />

            {/* <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={arrowIosForwardFill} />}
                >
                    View All
                </Button>
            </Box> */}
        </Card>
    );
}
