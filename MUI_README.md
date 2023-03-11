Sound Crate is using Material UI for our CSS library.
[Mat UI](https://mui.com/material-ui/)

Why use Mat UI?

Three Big Reasons
1. Customizable: Material-UI provides a wide range of customization options for its components, which allows tailoring to specific needs. This includes customizing colors, typography, spacing, and many other aspects of the components to fit the application's design.

2. Time-saving: Using pre-built components from Material-UI can save  time and effort in building the UI from scratch. This means we can focus on building the core functionality of our application instead of spending time on building UI components.

3. Accessibility: Material-UI components are designed with accessibility in mind, which means they are easy to use and navigate for people with disabilities.



What does Sound Crate rely on?

THEMES!!!

Here's how to use themes:
Import the useTheme hook from the @mui/material/styles module:

import { useTheme } from '@mui/material/styles';

Call the useTheme hook within your component to access the theme object:

const theme = useTheme();

Use the theme object to access the desired properties, such as colors or typography settings, and apply them to your component's styles:

<Card sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main }}>Primary Color</Card>

In the above example, the Card component is given a style object with a backgroundColor property that uses the theme.palette.primary.main value, which is defined in the theme object created earlier.

You can import ThemeExample.jsx to see how different typography themes are displayed.



Why else use Mat UI?
Components!!!

Mat UI has many prebuilt components that are relatively plug and play. You can see this on display in TopBar JS with the use of Drawer and other components.

All components are available here:
[Mat UI](https://mui.com/material-ui/)

Simply put, if you can dream it, you will find it in the well documented list of components.



Why else??? Layout and Display
Sound Crate will use card templates found here:
[Cards](https://mui.com/material-ui/react-card/)

Grids!!!
[Grids](https://mui.com/material-ui/react-grid/)
Using a grid system like Material UI's Grid can help with building responsive layouts that adapt to different screen sizes, which is especially important when building a mobile-first app that will also be used on desktop.

By using a grid system, we can easily create a layout that will reflow and adjust to different screen sizes. This can save time and effort compared to manually adjusting CSS properties for each screen size. Material UI's Grid also includes a number of useful features, such as breakpoints, that allows different layouts for different screen sizes.

Lastly, no more need for fontawesome.com. Mat UI has it all.
Disover a host of Icons you would need here:
[Iocns](https://mui.com/material-ui/material-icons/)