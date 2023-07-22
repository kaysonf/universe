import { useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  TablerIcons,
} from "../../../../shared/src/components";
import { Applications } from "./Applications";

type StylesProp = {
  openMenu: boolean;
  openWidth: string;
};
const useStyles = (props: StylesProp) =>
  createStyles((theme) => ({
    wrapper: {
      display: "flex",
    },

    aside: {
      flex: `0 0 ${rem(60)}`,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
    },

    main: {
      flex: 1,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      width: props.openMenu ? props.openWidth : "1rem",
      transition: "width 0.3s ease",
    },

    mainLink: {
      width: rem(44),
      height: rem(44),
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },

    mainLinkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },

    title: {
      boxSizing: "border-box",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      padding: theme.spacing.md,
      paddingTop: rem(18),
      height: rem(60),
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
    },

    logo: {
      boxSizing: "border-box",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      height: rem(60),
      paddingTop: theme.spacing.md,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      marginBottom: theme.spacing.xl,
    },

    link: {
      boxSizing: "border-box",
      display: "block",
      textDecoration: "none",
      borderTopRightRadius: theme.radius.md,
      borderBottomRightRadius: theme.radius.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      padding: `0 ${theme.spacing.md}`,
      fontSize: theme.fontSizes.sm,
      marginRight: theme.spacing.md,
      fontWeight: 500,
      height: rem(44),
      lineHeight: rem(44),

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },

    linkActive: {
      "&, &:hover": {
        borderLeftColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        color: theme.white,
      },
    },
  }));

type Menu = "Applications" | "Dashboard";

type MenuItems = {
  label: Menu;
  icon: (...args: any[]) => JSX.Element;
};

const MENU: MenuItems[] = [
  { label: "Applications", icon: TablerIcons.IconAppWindow },
  { label: "Dashboard", icon: TablerIcons.IconGauge },
];

export function Navigation() {
  const [active, setActive] = useState<Menu | null>(null);

  const showMenuDetails = active !== null;

  const { classes, cx } = useStyles({
    openMenu: showMenuDetails,
    openWidth: "20em",
  })();

  const menus = MENU.map((selection) => (
    <Tooltip
      label={selection.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={selection.label}
    >
      <UnstyledButton
        onClick={() =>
          setActive((selected) =>
            selected === selection.label ? null : selection.label
          )
        }
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: selection.label === active,
        })}
      >
        <selection.icon size="1.4rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const Details = () => {
    switch (active) {
      case "Applications": {
        return <Applications />;
      }

      case "Dashboard": {
        return <></>;
      }

      default: {
        return <></>;
      }
    }
  };

  return (
    <div>
      <Navbar>
        <Navbar.Section grow className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>
              {showMenuDetails && (
                <UnstyledButton onClick={() => setActive(null)}>
                  <TablerIcons.IconArrowBackUp />
                </UnstyledButton>
              )}
            </div>
            {menus}
          </div>

          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>

            {showMenuDetails && <Details />}
          </div>
        </Navbar.Section>
      </Navbar>
    </div>
  );
}
