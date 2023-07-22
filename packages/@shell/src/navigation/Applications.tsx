import {
  createStyles,
  rem,
  Text,
  TablerIcons,
} from "../../../../shared/src/components";
import { useApplicationDrag } from "../hooks/useApplicationDnD";
import { ApplicationMetaData } from "../applicationLoader";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

function Application(props: { tags: string[]; meta: ApplicationMetaData }) {
  const { classes, cx } = useStyles();

  const [{ isDragging }, drag] = useApplicationDrag(props.meta);

  return (
    <div
      ref={drag}
      className={cx(classes.item, { [classes.itemDragging]: isDragging })}
    >
      <div className={classes.dragHandle}>
        <TablerIcons.IconGripVertical size="1.05rem" stroke={1.5} />
      </div>
      <div>
        <Text>{props.meta.name}</Text>
        {props.tags.map((t) => (
          <Text key={t} color="dimmed" size="sm">
            {t}
          </Text>
        ))}
      </div>
    </div>
  );
}

export function Applications() {
  // TODO: dynamic, will be from a service or db

  return (
    <>
      <Application
        tags={["game"]}
        meta={{
          id: "unique",
          name: "tic tac toe",
          sysImportUrl: "http://localhost:3000/universe-examples.js",
        }}
      />
      {/* <Application
        tags={["finance"]}
        meta={{
          id: "unique",
          name: "seedly",
          sysImportUrl: "yourmother",
        }}
      /> */}
    </>
  );
}
