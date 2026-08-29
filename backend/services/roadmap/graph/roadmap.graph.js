import { StateGraph } from "@langchain/langgraph";
import { RoadmapState } from "./roadmap.state.js";
import roadmapAgent from "../agents/roadmap.agent.js";
import resourceAgent from "../agents/resource.agent.js";



const graph = new StateGraph(RoadmapState)
.addNode("roadmapAgent" , roadmapAgent)
.addNode("resourceAgent" ,resourceAgent)
.addEdge("__start__","roadmapAgent")
.addEdge("roadmapAgent","resourceAgent")
.addEdge("resourceAgent", "__end__")
.compile()

export default graph