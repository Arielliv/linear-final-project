import {CoverTimeRun} from "./AlgorithemsRun/CoverTimeRun";
import {PageRankRun} from "./AlgorithemsRun/PageRankRun";
import {PowerIterationRun} from "./AlgorithemsRun/PowerIteration";
import {getGraphByNumber} from "./Utils/graphUtils";

for (let i = 0; i < 2; i++) {

    //1.
    CoverTimeRun({graph: getGraphByNumber(i), graphIndex: i})

    //2
    PageRankRun({graph:getGraphByNumber(i), graphIndex: i})

    //3
    PowerIterationRun({graph:getGraphByNumber(i), graphIndex: i});
}





