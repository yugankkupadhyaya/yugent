import {Annotation} from "@langchain/langgraph"
  
export const RoadmapState = Annotation.Root({
    
  role: Annotation,

  targetPackage: Annotation,

  useResume: Annotation,

  resume: Annotation,

  roadmap: Annotation,

})