// src/lib/mock-responses.ts

import { SkillLevel, ToneType, CompanyType } from '@/types';

export interface MockResponse {
  beginner: { casual: string; professional: string; formal: string };
  intermediate: { casual: string; professional: string; formal: string };
  expert: { casual: string; professional: string; formal: string };
}

export const interviewQuestions = {
  neural_networks: {
    question: "Can you explain how neural networks work?",
    category: "Machine Learning",
    
    beginner: {
      casual: "I'm still learning ML, but from what I understand, neural networks are kinda like how our brain works - they learn patterns from data. They use something called backpropagation to get better over time. I know there's layers and weights involved, but honestly I'd love to dive deeper into the math with someone experienced.",
      
      professional: "I'm currently developing my understanding of machine learning. From my studies, neural networks process information through interconnected layers, similar to biological neurons. They improve through a process called backpropagation. I'm eager to expand my practical knowledge in this area.",
      
      formal: "I am building foundational knowledge in machine learning. Neural networks, as I understand them, utilize layered architectures to process information and employ backpropagation for optimization. I would appreciate the opportunity to deepen my expertise under experienced guidance."
    },
    
    intermediate: {
      casual: "Yeah, so I've worked with neural networks a bit. They're basically layers of neurons that pass signals forward, then use backprop to adjust weights based on errors. I've built some models with TensorFlow - like a basic image classifier. Still learning about the more advanced architectures though.",
      
      professional: "I have hands-on experience implementing neural networks. They consist of interconnected layers that forward-propagate inputs and use backpropagation for weight optimization. I've developed several models using TensorFlow, including image classification systems. I'm continuing to explore advanced architectures like transformers.",
      
      formal: "I possess practical experience with neural network implementation. These systems utilize layered architectures for forward propagation and employ backpropagation algorithms for parameter optimization. My portfolio includes TensorFlow-based models for computer vision tasks. I am actively expanding my expertise in contemporary architectures."
    },
    
    expert: {
      casual: "Neural networks are my bread and butter. You've got your forward pass where data flows through weighted layers with activation functions, then backprop calculates gradients using chain rule to update weights. I've architected everything from CNNs for vision tasks to transformers for NLP. The key is knowing when to use which architecture and how to prevent overfitting.",
      
      professional: "I have extensive experience with neural network architectures. The forward propagation phase processes inputs through weighted layers with activation functions, while backpropagation computes gradients via the chain rule for weight updates. I've designed and deployed CNNs, RNNs, and transformer models for production environments, with particular focus on optimization and regularization strategies.",
      
      formal: "I possess comprehensive expertise in neural network theory and implementation. These systems employ forward propagation through parameterized layers with non-linear activation functions, followed by gradient-based optimization via backpropagation utilizing the chain rule. My experience encompasses designing convolutional, recurrent, and attention-based architectures for enterprise-scale applications, with emphasis on performance optimization and generalization."
    }
  },

  scale_database: {
    question: "How would you scale our database to handle 10x traffic?",
    category: "System Design",
    
    beginner: {
      casual: "Honestly, I haven't scaled databases for huge traffic before, but I'd probably start by looking at what's slow - like maybe add some caching? I know things like Redis help. And I've heard about read replicas for spreading out queries. I'd definitely want to learn from the team's experience on this.",
      
      professional: "While I'm still building experience with large-scale systems, my approach would involve performance analysis first, then implementing caching solutions like Redis. I understand read replicas can distribute query load. I'm eager to learn database scaling best practices from experienced team members.",
      
      formal: "I am developing proficiency in distributed systems. My initial approach would include comprehensive performance profiling, followed by implementing caching layers and read replication strategies. I recognize the complexity of scaling operations and would value mentorship from senior engineers in this domain."
    },
    
    intermediate: {
      casual: "I've done some database scaling before. First thing is profiling to find bottlenecks - probably slow queries or too many writes. I'd add read replicas to handle query load, set up Redis for caching hot data, and look into connection pooling. If we're hitting write limits, might need to think about sharding, though that gets complex.",
      
      professional: "I have experience scaling databases in production. My approach would start with comprehensive profiling to identify bottlenecks. I'd implement read replicas for query distribution, Redis caching for frequently accessed data, and optimize connection pooling. For write-heavy workloads, I'd evaluate sharding strategies while considering operational complexity.",
      
      formal: "I possess practical experience in database optimization and scaling. My methodology involves systematic performance analysis, followed by implementing read replication for query distribution, caching layers for hot data, and connection pool optimization. For write-intensive scenarios, I would assess horizontal partitioning strategies while accounting for maintenance overhead."
    },
    
    expert: {
      casual: "Alright, so 10x traffic - first I'm profiling everything: query patterns, read/write ratio, hot spots. Then it's a multi-layer approach: read replicas with load balancing, Redis cluster for caching with proper invalidation strategies, connection pooling tuned for your workload. If writes are the bottleneck, we're looking at sharding - probably by user ID or geographic region. I'd also evaluate moving some data to a different storage pattern, like using Elasticsearch for search queries or S3 for cold data. The key is incremental changes with solid monitoring.",
      
      professional: "For 10x scaling, I'd begin with comprehensive profiling of query patterns and system bottlenecks. My strategy involves multiple layers: implementing read replicas with intelligent load balancing, deploying a Redis cluster with strategic cache invalidation, and optimizing connection pools. For write scalability, I'd design a sharding strategy based on access patterns. Additionally, I'd evaluate polyglot persistence - offloading search to Elasticsearch and archival data to object storage. Each change would be instrumented with detailed metrics.",
      
      formal: "To accommodate 10x traffic growth, I would initiate comprehensive system profiling to identify performance constraints and access patterns. My architectural approach would incorporate multiple optimization layers: read replica deployment with sophisticated load distribution, distributed caching infrastructure with intelligent invalidation mechanisms, and connection pool optimization calibrated to workload characteristics. For write-path scaling, I would architect a horizontal partitioning strategy informed by data access patterns and consistency requirements. Furthermore, I would evaluate polyglot persistence architectures, potentially leveraging specialized data stores for specific use cases. All modifications would be accompanied by comprehensive observability instrumentation."
    }
  },

  tell_me_failure: {
    question: "Tell me about a time you failed and what you learned",
    category: "Behavioral",
    
    beginner: {
      casual: "So in school, I tried building this app without really planning it out. Just jumped into coding. It got super messy and I had to start over. Taught me to actually design things before coding. Now I try to think through the architecture first, even if it's just sketching it out.",
      
      professional: "During an academic project, I began implementation without adequate planning, which resulted in technical debt requiring a restart. This experience taught me the importance of upfront design. I now prioritize architectural planning before development, even for smaller projects.",
      
      formal: "In an academic context, I initiated development without sufficient architectural planning, resulting in substantial technical debt and project restart. This experience underscored the critical importance of preliminary design phases. I have since implemented structured planning methodologies in my development approach."
    },
    
    intermediate: {
      casual: "Yeah, so at my last job I underestimated a database migration - thought it'd take a week, took three. Didn't account for data validation issues and rollback complexity. Cost the team time. I learned to add buffer to estimates and actually test migrations in staging first. Now I build rollback plans before touching production data.",
      
      professional: "At my previous position, I significantly underestimated a database migration timeline, projecting one week versus the actual three weeks required. I hadn't properly accounted for data validation complexity and rollback procedures. This taught me to build substantial buffers into technical estimates and thoroughly test migrations in staging environments. I now develop comprehensive rollback strategies before any production database changes.",
      
      formal: "In my previous role, I substantially underestimated the complexity of a database migration initiative, projecting one week versus the actual three-week duration. The oversight pertained to data validation requirements and rollback procedure complexity. This experience informed my approach to technical estimation, emphasizing the necessity of conservative timelines and comprehensive staging environment validation. I now mandate detailed rollback procedures prior to any production data operations."
    },
    
    expert: {
      casual: "Big one was when I architected a microservices migration without properly considering operational complexity. We went from one monolith to 15 services overnight. Debugging became a nightmare - distributed tracing wasn't set up, no service mesh, monitoring was a mess. Took us two months to stabilize. Learned that architecture isn't just about the code - it's about observability, deployment, and team readiness. Now I do incremental migrations with proper tooling first.",
      
      professional: "A significant failure was architecting an aggressive microservices migration without adequately addressing operational complexity. We transitioned from a monolithic architecture to 15 services without proper observability infrastructure - no distributed tracing, service mesh, or consolidated monitoring. System stabilization required two months. This experience taught me that architectural decisions must account for operational readiness, not just technical design. I now advocate for incremental migrations with observability-first approaches and comprehensive team preparation.",
      
      formal: "A critical failure in my experience involved architecting an ambitious microservices migration without sufficient consideration for operational infrastructure requirements. The transition from monolithic architecture to 15 distributed services was executed without adequate observability tooling - specifically lacking distributed tracing capabilities, service mesh infrastructure, and unified monitoring solutions. System stabilization required an extensive two-month remediation period. This experience fundamentally informed my architectural philosophy: technical design decisions must be balanced with operational readiness, team capability, and infrastructure maturity. I now advocate for incremental migration strategies with observability-first implementations and comprehensive organizational preparation."
    }
  },

  react_optimization: {
    question: "How would you optimize a slow React application?",
    category: "Frontend Development",
    
    beginner: {
      casual: "I'd probably start with React DevTools to see what's rendering a lot. Maybe use useMemo for expensive calculations? I know re-renders can slow things down, so I'd try to avoid unnecessary ones. Still learning about all the optimization techniques though.",
      
      professional: "I would begin with React DevTools Profiler to identify performance bottlenecks. I understand that memoization techniques like useMemo can help with expensive computations, and minimizing unnecessary re-renders is important. I'm continuing to learn advanced optimization strategies.",
      
      formal: "My approach would commence with React DevTools Profiler analysis to identify performance constraints. I would apply memoization strategies for computationally intensive operations and work to minimize extraneous component re-renders. I am actively developing expertise in advanced optimization methodologies."
    },
    
    intermediate: {
      casual: "First thing is React DevTools Profiler to find what's actually slow - usually it's unnecessary re-renders. I'd use React.memo for expensive components, useMemo for heavy calculations, and useCallback to stabilize function references. Also check if we're rendering huge lists without virtualization - react-window helps there. Code splitting with lazy loading is good for initial load time too.",
      
      professional: "I would start with React DevTools Profiler to identify specific bottlenecks. My optimization strategy includes: React.memo for expensive components, useMemo for computationally intensive operations, useCallback for function reference stability, and list virtualization using libraries like react-window. Additionally, I'd implement code splitting with React.lazy for improved initial load performance.",
      
      formal: "My optimization methodology would begin with React DevTools Profiler analysis to identify specific performance constraints. I would implement: component memoization via React.memo for computationally expensive renders, useMemo for intensive calculations, useCallback for function reference optimization, and virtualization solutions for large dataset rendering. Furthermore, I would implement code-splitting strategies utilizing React.lazy to enhance initial application load performance."
    },
    
    expert: {
      casual: "Performance optimization is all about measurement first. I'd use React DevTools Profiler plus Chrome Performance tab to get the full picture - rendering, scripting, layout. Then it's systematic: React.memo with custom comparison functions for complex props, useMemo/useCallback strategically (not everywhere - they have cost too), virtualization for any list over 50 items, code splitting at route and component level. I'd also look at the data layer - maybe we're over-fetching or causing waterfalls. Consider moving to React Server Components if applicable, or at least aggressive caching with SWR/React Query. Bundle analysis to catch large dependencies. The key is measuring before and after each change.",
      
      professional: "My approach to React optimization is measurement-driven. I utilize React DevTools Profiler in conjunction with Chrome Performance tools to establish comprehensive performance baselines covering rendering, scripting, and layout phases. My optimization strategy is methodical: selective component memoization with custom comparison functions, strategic useMemo/useCallback application (acknowledging their overhead), virtualization for lists exceeding 50 items, and granular code splitting at both route and component levels. I also analyze data fetching patterns to eliminate over-fetching and request waterfalls, potentially implementing React Server Components or aggressive caching strategies with SWR/React Query. Bundle analysis identifies heavy dependencies. Each optimization is validated through measurement.",
      
      formal: "My React optimization methodology is fundamentally measurement-driven, utilizing React DevTools Profiler in conjunction with Chrome Performance profiling to establish comprehensive performance baselines encompassing render cycles, script execution, and layout operations. My systematic approach includes: selective component memoization employing custom equality functions for complex property comparisons, judicious application of useMemo and useCallback hooks with awareness of their overhead implications, virtualization implementation for datasets exceeding 50 items, and granular code-splitting strategies at route and component boundaries. Additionally, I analyze data layer architecture to eliminate over-fetching patterns and request cascades, potentially implementing React Server Components or sophisticated caching architectures utilizing SWR or React Query. Bundle analysis identifies dependencies contributing excessive weight. Critically, each optimization is validated through empirical measurement to ensure positive impact."
    }
  },

  api_design: {
    question: "How would you design a RESTful API for a social media platform?",
    category: "Backend Development",
    
    beginner: {
      casual: "I'd probably have endpoints like /users for user stuff, /posts for posts, maybe /comments. Use GET to fetch things, POST to create, PUT to update. I know you need to think about authentication too, like with tokens. Still learning about best practices for API design though.",
      
      professional: "I would structure resources around entities like /users, /posts, and /comments, utilizing appropriate HTTP methods: GET for retrieval, POST for creation, PUT for updates. Authentication would be implemented using token-based approaches. I'm continuing to study API design best practices and conventions.",
      
      formal: "My design would organize resources hierarchically around core entities such as /users, /posts, and /comments, employing standard HTTP methods according to their semantic purposes. Authentication mechanisms would utilize token-based protocols. I am actively developing expertise in RESTful API design principles and industry conventions."
    },
    
    intermediate: {
      casual: "I'd design around resources: /users, /posts, /comments with proper HTTP verbs. Probably nest some endpoints like /posts/:id/comments for better organization. Use JWT for auth with refresh tokens. Important stuff: proper status codes (200, 201, 404, etc.), pagination for lists, rate limiting, and versioning like /v1/posts. I'd document everything with OpenAPI/Swagger.",
      
      professional: "My design would center on RESTful resources: /users, /posts, /comments, utilizing nested routes where appropriate (e.g., /posts/:id/comments). Authentication would use JWT with refresh token implementation. Key considerations include: proper HTTP status codes, pagination for collection endpoints, rate limiting, and API versioning (e.g., /v1/). I would provide comprehensive documentation using OpenAPI/Swagger specifications.",
      
      formal: "My API architecture would be organized around RESTful resource principles: /users, /posts, /comments, with appropriate endpoint nesting for hierarchical relationships (e.g., /posts/:id/comments). Authentication would employ JWT-based mechanisms with refresh token rotation. Critical design elements include: semantically correct HTTP status codes, pagination implementation for collection endpoints, rate limiting policies, and version management through URI versioning (e.g., /v1/). Comprehensive documentation would be provided via OpenAPI/Swagger specifications."
    },
    
    expert: {
      casual: "Social media API needs to scale, so I'm thinking beyond basic REST. Core resources: /users, /posts, /feed, /comments with smart nesting. Auth is OAuth 2.0 with short-lived JWTs and refresh tokens. Pagination uses cursor-based approach (not offset - breaks with real-time data). Rate limiting per user tier with Redis. For the feed, probably need GraphQL or at least field filtering to avoid over-fetching - mobile clients don't need everything. Caching strategy with ETags and Cache-Control headers. Webhooks for real-time features. API versioning in headers (not URL - cleaner). Everything's async for heavy operations. And comprehensive monitoring - track response times, error rates per endpoint.",
      
      professional: "For a scalable social media API, I would implement: Core resources (/users, /posts, /feed, /comments) with strategic endpoint nesting. Authentication via OAuth 2.0 with short-lived JWT access tokens and secure refresh token rotation. Cursor-based pagination for real-time data consistency. Redis-backed rate limiting with tiered user quotas. For the feed endpoint, I'd consider GraphQL or field filtering capabilities to optimize mobile bandwidth. Caching strategy utilizing ETags and Cache-Control headers. Webhook infrastructure for real-time notifications. Header-based API versioning for cleaner URI structure. Asynchronous processing for resource-intensive operations. Comprehensive observability including response time tracking and per-endpoint error rates.",
      
      formal: "My architecture for a social media API would emphasize scalability and performance: Core resource design around /users, /posts, /feed, /comments with judicious endpoint nesting informed by access patterns. Authentication infrastructure utilizing OAuth 2.0 with short-lived JWT access tokens and secure refresh token rotation mechanisms. Cursor-based pagination implementation to maintain consistency in real-time data environments. Distributed rate limiting via Redis with hierarchical user tier quotas. For feed endpoints, I would evaluate GraphQL implementation or sophisticated field filtering to optimize mobile client bandwidth utilization. Caching architecture leveraging ETags and Cache-Control headers for optimal resource revalidation. Webhook infrastructure for real-time event distribution. Header-based API versioning to maintain URI cleanliness and flexibility. Asynchronous processing architecture for computationally intensive operations. Comprehensive observability platform tracking latency percentiles, error rates per endpoint, and resource utilization metrics."
    }
  }
};

// Helper function to get response based on user profile
export function getResponse(
  questionKey: keyof typeof interviewQuestions,
  skillLevel: SkillLevel,
  tone: ToneType,
  companyType?: CompanyType
): string {
  const question = interviewQuestions[questionKey];
  if (!question) return "Response not found";
  
  return question[skillLevel][tone];
}

// Generic "without Human Mode" response (always sounds like ChatGPT)
export function getGenericResponse(questionKey: keyof typeof interviewQuestions): string {
  const genericResponses: Record<string, string> = {
    neural_networks: "Neural networks are computational models inspired by biological neural networks. They consist of interconnected layers of artificial neurons that process information through weighted connections. The learning process involves forward propagation of inputs through the network, followed by backpropagation of errors to adjust weights using gradient descent optimization. This iterative process enables the network to learn complex patterns and relationships in data.",
    
    scale_database: "To scale a database for 10x traffic, I would implement a comprehensive strategy including: read replicas for distributing query load, implementing a caching layer such as Redis or Memcached, optimizing database queries and indexes, implementing connection pooling, and considering horizontal partitioning (sharding) for write scalability. Additionally, I would evaluate the use of a CDN for static content and implement appropriate monitoring and alerting systems.",
    
    tell_me_failure: "In my previous role, I encountered a project setback when implementing a new feature. The initial approach proved inefficient, requiring a significant refactoring effort. This experience taught me the importance of thorough planning, code reviews, and testing before deployment. I learned to better estimate project complexity and communicate potential risks to stakeholders. Moving forward, I have implemented more rigorous planning processes and checkpoint reviews to prevent similar issues.",
    
    react_optimization: "To optimize a React application, I would employ several strategies: utilize React.memo() for component memoization, implement useMemo() and useCallback() hooks for expensive computations, use code splitting with React.lazy() and Suspense, implement virtualization for long lists using libraries like react-window, optimize bundle size through tree shaking and analyzing webpack bundle, minimize re-renders by properly structuring state and avoiding inline functions in JSX, and utilize the React DevTools Profiler to identify performance bottlenecks.",
    
    api_design: "For a RESTful API design for a social media platform, I would implement the following structure: resource-based endpoints following REST conventions (e.g., /users, /posts, /comments), proper HTTP methods (GET, POST, PUT, DELETE), appropriate status codes (200, 201, 400, 404, 500), JWT-based authentication with refresh tokens, pagination for list endpoints, rate limiting to prevent abuse, API versioning (e.g., /v1/), comprehensive error handling with descriptive messages, HATEOAS principles for API discoverability, and thorough documentation using OpenAPI/Swagger specifications."
  };
  
  return genericResponses[questionKey] || "I would approach this systematically by analyzing the requirements, designing an appropriate solution, implementing best practices, and thoroughly testing the implementation.";
}