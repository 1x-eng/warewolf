const config = {
    gridSizeX: parseInt(process.env.GRID_SIZE_X || '10'), //TODO: read from env
    gridSizeY: parseInt(process.env.GRID_SIZE_Y || '10')
};

export default config;
