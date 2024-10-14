'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Check, X, ChevronRight, ChevronLeft } from "lucide-react"

export function OnboardingWizardComponent() {
  const [step, setStep] = useState(1)
  const [nodes, setNodes] = useState([{ ip: "", connected: false }])
  const [cpuAllocation, setCpuAllocation] = useState(4)
  const [memoryAllocation, setMemoryAllocation] = useState(8)
  const [cloudIntegration, setCloudIntegration] = useState(false)

  const totalSteps = 4

  const handleAddNode = () => {
    setNodes([...nodes, { ip: "", connected: false }])
  }

  const handleNodeIpChange = (index: number, value: string) => {
    const newNodes = [...nodes]
    newNodes[index].ip = value
    setNodes(newNodes)
  }

  const handleTestConnection = (index: number) => {
    // Simulating connection test
    const newNodes = [...nodes]
    newNodes[index].connected = Math.random() > 0.5
    setNodes(newNodes)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to Distributed Compute System</h2>
            <p>
              This wizard will guide you through the initial setup of your distributed computing environment. Let's get
              started!
            </p>
            <Button onClick={() => setStep(2)}>Get Started</Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Node Connection</h2>
            <p>Connect your nodes to the system by entering their IP addresses below:</p>
            {nodes.map((node, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Enter node IP"
                  value={node.ip}
                  onChange={(e) => handleNodeIpChange(index, e.target.value)}
                />
                <Button onClick={() => handleTestConnection(index)}>Test Connection</Button>
                {node.connected ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </div>
            ))}
            <Button onClick={handleAddNode}>Add Another Node</Button>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Resource Configuration</h2>
            <div className="space-y-2">
              <Label>CPU Resource Allocation (1-8 CPUs)</Label>
              <Slider
                min={1}
                max={8}
                step={1}
                value={[cpuAllocation]}
                onValueChange={(value) => setCpuAllocation(value[0])}
              />
              <span>{cpuAllocation} CPUs</span>
            </div>
            <div className="space-y-2">
              <Label>Memory Allocation (GB)</Label>
              <Input
                type="number"
                value={memoryAllocation}
                onChange={(e) => setMemoryAllocation(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="cloud-integration"
                checked={cloudIntegration}
                onCheckedChange={setCloudIntegration}
              />
              <Label htmlFor="cloud-integration">Enable Cloud Integration</Label>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">System Walkthrough</h2>
            <p>Here's a quick overview of the main dashboard features:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Job Submission Panel: Submit and manage distributed computing tasks</li>
              <li>Real-time Monitoring: Track the progress and performance of your jobs</li>
              <li>Resource Management: Optimize resource allocation across your network</li>
              <li>Cost Management: Monitor and control expenses related to distributed computing</li>
            </ul>
            <Button onClick={() => console.log("Redirect to main dashboard")}>Start Using System</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {step < totalSteps && (
            <Button className="ml-auto" onClick={() => setStep(step + 1)}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}