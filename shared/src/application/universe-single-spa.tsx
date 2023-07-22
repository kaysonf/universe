import * as React from "react";
import singleSpaReact from "single-spa-react";
import * as child_process from "child_process";


type TestCtx = {
    n: number;
    setN: React.Dispatch<React.SetStateAction<number>>
}
const TestP = React.createContext<TestCtx>({n: 0, setN: (n) => 1});

function AppCtx(props: {children: React.ReactElement}) {
    const [n ,setN] = React.useState(0);

    return <TestP.Provider value={{n, setN}}>
        {props.children}
    </TestP.Provider>
}

export function useShellCtx() {
    return React.useContext(TestP);
}
export function universeSingleSpaReact(params: Parameters<typeof singleSpaReact>[0]) {
    const Root = params.rootComponent;

    if (Root === undefined) {
        throw Error("expected root component");
    }

    return singleSpaReact({
        ...params,
        rootComponent: (args) =>
            <AppCtx>
                <Root {...args} />
            </AppCtx>

    });
}