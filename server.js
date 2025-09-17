// const express = require("express");
// const cors = require("cors");

// const app = express();

// // Enable CORS for all origins during development
// app.use(cors({
//   origin: true, // Allow all origins
//   credentials: true
// }));

// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// // Enhanced in-memory cache
// let dataCache = {
//   data: null,
//   lastFetch: 0,
//   isLoading: false,
//   lastError: null,
//   connectionAttempts: 0
// };

// const CACHE_DURATION = 60000; // 1 minute cache
// const MAX_RETRY_ATTEMPTS = 3;
// const RETRY_DELAY = 2000; // 2 seconds

// // Sleep function for retry delays
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Enhanced data fetcher with retry mechanism
// async function getCachedData() {
//   const now = Date.now();
  
//   // Return cached data if still fresh
//   if (dataCache.data && (now - dataCache.lastFetch) < CACHE_DURATION) {
//     console.log("📦 Using cached data");
//     return dataCache.data;
//   }

//   // Prevent multiple simultaneous requests
//   if (dataCache.isLoading) {
//     console.log("⏳ Waiting for ongoing request...");
//     let attempts = 0;
//     while (dataCache.isLoading && attempts < 50) {
//       await sleep(200);
//       attempts++;
//     }
//     return dataCache.data || [];
//   }

//   dataCache.isLoading = true;
//   console.log("🔄 Fetching fresh data from API...");
  
//   let lastError = null;
  
//   // Try multiple times with different approaches
//   for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
//     try {
//       console.log(`🔄 Attempt ${attempt}/${MAX_RETRY_ATTEMPTS}`);
      
//       // Try to import fetch
//       let fetch;
//       try {
//         fetch = (await import("node-fetch")).default;
//       } catch (importErr) {
//         console.log("⚠️ node-fetch not available, trying global fetch...");
//         fetch = global.fetch || require('node-fetch');
//       }
      
//       console.time(`API Fetch Attempt ${attempt}`);
      
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => {
//         controller.abort();
//       }, 10000); // 10 second timeout
      
//       const response = await fetch("http://localhost:8080/internal/kln_dms_dieactual", {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'User-Agent': 'NodeJS-Backend/1.0',
//           'Connection': 'keep-alive'
//         },
//         signal: controller.signal,
//         timeout: 10000
//       });
      
//       clearTimeout(timeoutId);
//       console.timeEnd(`API Fetch Attempt ${attempt}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log(`✅ Successfully fetched ${data.length} items from API`);
      
//       // Reset error state on success
//       dataCache.data = data;
//       dataCache.lastFetch = now;
//       dataCache.isLoading = false;
//       dataCache.lastError = null;
//       dataCache.connectionAttempts = 0;
      
//       return data;
      
//     } catch (err) {
//       lastError = err;
//       console.error(`❌ Attempt ${attempt} failed: ${err.message}`);
      
//       if (attempt < MAX_RETRY_ATTEMPTS) {
//         console.log(`⏳ Retrying in ${RETRY_DELAY/1000} seconds...`);
//         await sleep(RETRY_DELAY);
//       }
//     }
//   }
  
//   // All attempts failed
//   dataCache.isLoading = false;
//   dataCache.lastError = lastError;
//   dataCache.connectionAttempts++;
  
//   console.error(`❌ All ${MAX_RETRY_ATTEMPTS} attempts failed. Last error: ${lastError.message}`);
  
//   // Return stale data if available, otherwise empty array
//   if (dataCache.data && dataCache.data.length > 0) {
//     console.log("📦 Returning stale cached data due to API failure");
//     return dataCache.data;
//   }
  
//   // No data available at all
//   console.log("🚫 No data available - API connection required");
//   return [];
// }

// // Configuration
// const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
// const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

// // Ollama integration for general responses
// const getOllamaResponse = async (prompt) => {
//   try {
//     console.log(`🤖 Calling Ollama (${OLLAMA_MODEL}) for general response...`);
    
//     // Try to import fetch
//     let fetch;
//     try {
//       fetch = (await import("node-fetch")).default;
//     } catch (importErr) {
//       fetch = global.fetch || require('node-fetch');
//     }

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

//     const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: OLLAMA_MODEL,
//         prompt: prompt,
//         stream: false,
//         options: {
//           temperature: 0.7,
//           top_p: 0.9,
//           num_predict: 500, // Max tokens
//           top_k: 40,
//           repeat_penalty: 1.1
//         }
//       }),
//       signal: controller.signal
//     });

//     clearTimeout(timeoutId);

//     if (!response.ok) {
//       if (response.status === 404) {
//         throw new Error(`Model '${OLLAMA_MODEL}' not found. Please run: ollama pull ${OLLAMA_MODEL}`);
//       }
//       throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log(`✅ Got response from Ollama (${data.response?.length || 0} chars)`);
    
//     return data.response?.trim() || "I'm sorry, I couldn't generate a proper response right now.";
    
//   } catch (error) {
//     console.error("❌ Ollama error:", error.message);
    
//     // Better fallback responses when Ollama is not available
//     const fallbackResponses = {
//       greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|namaste|assalam|salam)/i.test(prompt) ? 
//         `Hello! I'm here to help you. 

// 🤖 Note: For better conversations, please ensure Ollama is running:
// 1. Install Ollama from https://ollama.ai
// 2. Run: ollama pull ${OLLAMA_MODEL}
// 3. Start: ollama serve

// Meanwhile, I can help with production data analysis!` : null,
        
//       help: /help|commands|what can you do/i.test(prompt) ? 
//         `I can help you with:

// 📊 **Production Data** (Always Available):
// • Completion rates and progress
// • Die status and pending items  
// • Plant information and summaries

// 🤖 **General Conversation** (Requires Ollama):
// • Natural conversations
// • Questions and explanations
// • General knowledge

// 🔧 **To enable full chat capabilities:**
// 1. Install Ollama: https://ollama.ai
// 2. Run: ollama pull ${OLLAMA_MODEL}
// 3. Start: ollama serve

// What would you like to know about?` : null,
        
//       time: /what time|current time|date|today/i.test(prompt) ? 
//         `⏰ Current time: ${new Date().toLocaleString()}
// 📅 Date: ${new Date().toDateString()}

// (Ollama not connected - using basic time response)` : null,
        
//       math: (() => {
//         const mathMatch = prompt.match(/(\d+\.?\d*)\s*([+\-*/])\s*(\d+\.?\d*)/);
//         if (mathMatch) {
//           const [, num1, operator, num2] = mathMatch;
//           const a = parseFloat(num1);
//           const b = parseFloat(num2);
//           let result;
          
//           switch (operator) {
//             case '+': result = a + b; break;
//             case '-': result = a - b; break;
//             case '*': result = a * b; break;
//             case '/': result = b !== 0 ? a / b : 'Cannot divide by zero'; break;
//             default: result = 'Invalid operation';
//           }
          
//           return `🧮 ${a} ${operator} ${b} = ${result}

// (Basic calculation - for more complex math, enable Ollama!)`;
//         }
//         return null;
//       })()
//     };

//     // Return fallback if available
//     for (const response of Object.values(fallbackResponses)) {
//       if (response) return response;
//     }

//     // Check if error suggests model not found
//     if (error.message.includes('not found') || error.message.includes('404')) {
//       return `🤖 Model '${OLLAMA_MODEL}' not found. Please install it:

// 1. **Install the model:**
//    \`\`\`bash
//    ollama pull ${OLLAMA_MODEL}
//    \`\`\`

// 2. **Start Ollama:**
//    \`\`\`bash
//    ollama serve
//    \`\`\`

// 3. **Alternative models to try:**
//    • \`ollama pull llama2\`
//    • \`ollama pull phi3\`
//    • \`ollama pull mistral\`

// Meanwhile, I can help with production data - try asking about "completion rate"!`;
//     }

//     // Generic fallback
//     return `🤖 I'd love to chat, but I need Ollama to give you great responses!

// **Quick Setup:**
// 1. **Download Ollama:** https://ollama.ai
// 2. **Install model:** \`ollama pull ${OLLAMA_MODEL}\`
// 3. **Start service:** \`ollama serve\`

// **Right now I can help with:**
// 📊 Production data analysis
// 🔢 Basic calculations
// ⏰ Current time/date

// What would you like to check?`;
//   }
// };

// // Production data pattern matching
// const isProductionQuery = (prompt) => {
//   const productionKeywords = [
//     'completion', 'rate', 'percentage', 'progress',
//     'pending', 'delayed', 'waiting', 'incomplete',
//     'ready', 'completed', 'finished', 'done',
//     'total', 'count', 'summary', 'overview',
//     'plant', 'location', 'facility', 'factory',
//     'die', 'status', 'production', 'manufacturing'
//   ];

//   return productionKeywords.some(keyword => 
//     prompt.toLowerCase().includes(keyword)
//   );
// };

// // Enhanced response generator for production data
// const createFastResponses = (data) => {
//   if (!data || data.length === 0) {
//     return {
//       default: "⚠️ No production data available. Please ensure the API server is running on port 8080.",
//       completion: "⚠️ Cannot calculate completion rate - API connection required",
//       pending: "⚠️ Cannot show pending items - API connection required", 
//       ready: "⚠️ Cannot show ready items - API connection required",
//       total: "⚠️ No data available - check API server connection",
//       plants: "⚠️ No plant data available - API connection required"
//     };
//   }

//   // Calculate statistics
//   const stats = {
//     total: data.length,
//     ready: data.filter(item => item.die_status?.toLowerCase() === 'ready').length,
//     pending: data.filter(item => item.die_status?.toLowerCase() === 'pending').length,
//     plants: [...new Set(data.map(item => item.plant))].filter(Boolean),
//     dies: [...new Set(data.map(item => item.die_number))].filter(Boolean)
//   };

//   stats.completionRate = stats.total > 0 ? ((stats.ready / stats.total) * 100).toFixed(1) : 0;

//   return {
//     completion: `✅ Completion Rate: ${stats.completionRate}% | ${stats.ready} ready out of ${stats.total} dies`,
//     pending: `⏳ Pending Dies: ${stats.pending} | Focus on dies with status "pending" for immediate action`,
//     ready: `🎯 Ready Dies: ${stats.ready} | These dies have completed all required elements`,
//     total: `📊 Total Overview: ${stats.total} dies | ${stats.ready} ready | ${stats.pending} pending | ${stats.plants.length} plants`,
//     plants: `🏭 Plants: ${stats.plants.join(', ')} | ${stats.plants.length} total plants in system`,
//     default: `📈 Quick Stats: ${stats.completionRate}% completion | ${stats.pending} pending | ${stats.ready} ready dies`
//   };
// };

// // Pattern matching function for production data
// const getInstantResponse = (prompt, responses) => {
//   const lower = prompt.toLowerCase();
  
//   if (/completion|rate|percentage|progress/i.test(prompt)) return responses.completion;
//   if (/pending|delayed|waiting|incomplete/i.test(prompt)) return responses.pending;
//   if (/ready|completed|finished|done/i.test(prompt)) return responses.ready;
//   if (/total|count|summary|overview|all/i.test(prompt)) return responses.total;
//   if (/plant|location|facility|factory/i.test(prompt)) return responses.plants;
  
//   return null;
// };

// // Smart filtering function
// const smartFilter = (data, prompt) => {
//   if (!data || data.length === 0) return [];
  
//   let filtered = data;

//   // Plant filtering
//   const plantMatch = prompt.match(/plant\s*(\d+)/i);
//   if (plantMatch) {
//     const plantNum = plantMatch[1];
//     filtered = filtered.filter(item => 
//       item.plant && item.plant.toString().includes(plantNum)
//     );
//   }

//   // Die filtering
//   const dieMatch = prompt.match(/die\s*(?:no\.?\s*)?(\d+)/i);
//   if (dieMatch) {
//     const dieNum = dieMatch[1];
//     filtered = filtered.filter(item =>
//       item.die_number && item.die_number.toString().includes(dieNum)
//     );
//   }

//   // Status filtering
//   if (/\bpending\b/i.test(prompt)) {
//     filtered = filtered.filter(item => 
//       item.die_status && item.die_status.toLowerCase() === 'pending'
//     );
//   } else if (/\bready\b/i.test(prompt)) {
//     filtered = filtered.filter(item => 
//       item.die_status && item.die_status.toLowerCase() === 'ready'
//     );
//   }

//   return filtered.slice(0, 20);
// };

// // Enhanced chat endpoint - Now handles both general and production queries
// app.post("/api/chat", async (req, res) => {
//   console.time("Total Response Time");
  
//   const { prompt } = req.body;

//   if (!prompt?.trim()) {
//     return res.json({ 
//       response: "Hello! I'm here to help. You can ask me general questions or ask about production data like completion rates, die status, etc. What would you like to know?" 
//     });
//   }

//   try {
//     // Check if this is a production-related query first
//     if (!isProductionQuery(prompt)) {
//       // Use Ollama for general conversation
//       console.time("Ollama Response");
//       const ollamaResponse = await getOllamaResponse(prompt);
//       console.timeEnd("Ollama Response");
//       console.timeEnd("Total Response Time");
      
//       return res.json({ response: ollamaResponse });
//     }

//     // Handle production data queries
//     console.time("Data Fetch");
//     const apiData = await getCachedData();
//     console.timeEnd("Data Fetch");

//     console.time("Response Generation");
//     const fastResponses = createFastResponses(apiData);
//     const instantResponse = getInstantResponse(prompt, fastResponses);
    
//     if (instantResponse) {
//       console.timeEnd("Response Generation");
//       console.timeEnd("Total Response Time");
//       return res.json({ response: instantResponse });
//     }

//     // Handle specific production queries
//     const filteredData = smartFilter(apiData, prompt);

//     if (filteredData.length === 0 && apiData.length > 0) {
//       console.timeEnd("Response Generation");
//       console.timeEnd("Total Response Time");
//       return res.json({ 
//         response: "🔍 No data matches your specific query. Try asking about 'completion rate', 'pending dies', or 'plant status'." 
//       });
//     }

//     // Handle case when no API data is available
//     if (apiData.length === 0) {
//       console.timeEnd("Response Generation");
//       console.timeEnd("Total Response Time");
//       return res.json({ 
//         response: "⚠️ No production data available. Please check:\n1. API server is running on port 8080\n2. Endpoint is accessible: http://localhost:8080/internal/kln_dms_dieactual\n3. Network connectivity is working\n\nMeanwhile, feel free to ask me general questions!" 
//       });
//     }

//     // If we reach here, return default response with filtered data summary
//     const summary = filteredData.length > 0 ? 
//       `Found ${filteredData.length} matching items. ${createFastResponses(filteredData).default}` :
//       createFastResponses(apiData).default;

//     console.timeEnd("Response Generation");
//     console.timeEnd("Total Response Time");
    
//     return res.json({ response: summary });

//   } catch (error) {
//     console.error("❌ Chat endpoint error:", error.message);
//     console.timeEnd("Total Response Time");
    
//     return res.status(500).json({ 
//       response: "⚠️ Something went wrong while processing your request. Please try again or check the server logs.",
//       error: error.message 
//     });
//   }
// });

// // Health check endpoint
// app.get("/api/health", async (req, res) => {
//   try {
//     const data = await getCachedData();
//     const isOllamaHealthy = await checkOllamaHealth();
    
//     res.json({
//       status: "healthy",
//       dataAvailable: data.length > 0,
//       dataCount: data.length,
//       cacheAge: Date.now() - dataCache.lastFetch,
//       ollamaStatus: isOllamaHealthy ? "connected" : "disconnected",
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "unhealthy",
//       error: error.message,
//       timestamp: new Date().toISOString()
//     });
//   }
// });

// // Check Ollama health
// const checkOllamaHealth = async () => {
//   try {
//     let fetch;
//     try {
//       fetch = (await import("node-fetch")).default;
//     } catch (importErr) {
//       fetch = global.fetch || require('node-fetch');
//     }

//     const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
//       method: 'GET',
//       timeout: 3000
//     });
    
//     return response.ok;
//   } catch (error) {
//     return false;
//   }
// };

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Production API: http://localhost:8080/internal/kln_dms_dieactual`);
//   console.log(`🤖 Ollama: ${OLLAMA_HOST} (Model: ${OLLAMA_MODEL})`);
//   console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
//   console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
// });