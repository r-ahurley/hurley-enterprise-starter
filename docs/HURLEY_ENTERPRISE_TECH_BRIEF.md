# Hurley Enterprise — Technical Brief
_A concise overview of architecture, proof of system integrity, and guiding philosophy_

---

## 1️⃣ Executive Summary

Hurley Enterprise is a unified technology framework built around a single moral principle:  
**structure is empathy.**

From this principle arise three convergent systems:
- **Hurley Enterprise Core** – a modular AWS-based backend that treats cloud infrastructure as moral geometry.  
- **SoccerWorld** – a social-sports application built on the same architecture; an applied field for real-time data and community systems.  
- **Mythic-Psychological** – a narrative and design philosophy binding the company’s technical and cultural identity.

Each component is independently operable, yet all share the same code discipline, documentation culture, and ethical design DNA.

---

## 2️⃣ System Overview

**Runtime Stack**
| Layer | Description |
|-------|--------------|
| **AWS Lambda** | Executes serverless telemetry and data-processing functions. |
| **Amazon DynamoDB** | Stores structured telemetry with millisecond latency. |
| **API Gateway** | Public endpoint accepting live data from edge clients (curl, mobile devices, or IoT). |
| **React / Next.js Front-Ends** | Provide dashboards and fan-interaction layers. |
| **Automation Shell (.zshrc)** | Defines aliases for rapid deployment (`gcp`, `logpush`) and transparent version control. |

**Telemetry Flow**
1. Device or client sends JSON payload to API Gateway.  
2. Gateway triggers `hurley-enterprise-telemetry` Lambda.  
3. Lambda validates input and writes to `TelemetryData` (DynamoDB).  
4. React dashboard or analytics endpoint queries DynamoDB for live visualization.  

**Verified Command Output**
```bash
$ curl -X POST -d '{"speed":5.2,"battery":93}' https://19ay6rk9gc.execute-api.us-east-1.amazonaws.com/prod/telemetry
{"message":"Data logged","input":{"speed":5.2,"battery":93}}

$ aws dynamodb scan --table-name TelemetryData --region us-east-1
{
  "Items": [
    {
      "deviceId": {"S": "lambda-001"},
      "timestamp": {"N": "1759835310957"},
      "speed": {"N": "5.2"},
      "battery": {"N": "93"}
    }
  ]
}

