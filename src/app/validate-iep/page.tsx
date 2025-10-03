'use client';

import { useState } from 'react';
import { validateIEP, formatValidationHTML, type IEPInput } from '@/lib/iep-validator';

export default function ValidateIEPPage() {
  const [input, setInput] = useState<IEPInput>({
    student_performance: "Todd, a fourth grader, currently reads 85 words per minute with 5 errors when given a first semester, second grade-level passage. According to district norms, Todd is reading at the 5th percentile for fourth graders in the fall.",
    grade_level: "4th Grade",
    areas_of_concern: "Academic (reading)",
    priority_goal_areas: "Reading Comprehension",
    accommodations: "Extended time, Visual aids/graphic organizers"
  });
  
  const [generatedIEP, setGeneratedIEP] = useState('');
  const [validationResult, setValidationResult] = useState<string | null>(null);
  
  const handleValidate = () => {
    if (!generatedIEP.trim()) {
      alert('Please paste generated IEP HTML');
      return;
    }
    
    const result = validateIEP(input, generatedIEP);
    const htmlReport = formatValidationHTML(result);
    setValidationResult(htmlReport);
  };
  
  const handleClear = () => {
    setGeneratedIEP('');
    setValidationResult(null);
  };
  
  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">IEP v3.1.1 Validator</h1>
        <p className="text-gray-600">
          Validate generated IEP documents against ULTRA-CONSERVATIVE rules
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT SECTION */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📝 Original Input</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Student Performance
                </label>
                <textarea
                  className="w-full p-3 border rounded-md font-mono text-sm"
                  rows={4}
                  value={input.student_performance}
                  onChange={(e) => setInput({ ...input, student_performance: e.target.value })}
                  placeholder="Brief description from teacher..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Grade Level</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={input.grade_level}
                    onChange={(e) => setInput({ ...input, grade_level: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Areas of Concern</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={input.areas_of_concern}
                    onChange={(e) => setInput({ ...input, areas_of_concern: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority Goal Areas</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={input.priority_goal_areas}
                  onChange={(e) => setInput({ ...input, priority_goal_areas: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Accommodations</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={input.accommodations}
                  onChange={(e) => setInput({ ...input, accommodations: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📄 Generated IEP (Paste Here)</h2>
            <textarea
              className="w-full p-3 border rounded-md font-mono text-xs"
              rows={12}
              value={generatedIEP}
              onChange={(e) => setGeneratedIEP(e.target.value)}
              placeholder="Paste generated IEP HTML here..."
            />
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleValidate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                🔍 Validate IEP
              </button>
              
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        
        {/* VALIDATION RESULT */}
        <div className="space-y-4">
          {validationResult ? (
            <div 
              className="bg-white p-6 rounded-lg shadow"
              dangerouslySetInnerHTML={{ __html: validationResult }}
            />
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg shadow text-center text-gray-500">
              <p className="text-lg mb-2">👈 Paste generated IEP and click Validate</p>
              <p className="text-sm">Validation results will appear here</p>
            </div>
          )}
          
          {/* RULES REFERENCE */}
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">📋 v3.1.1 Rules Reference</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>NO data invention:</strong> No comprehension %, focus time, independence % unless provided</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>NO functional paragraph:</strong> Unless input has trigger words (attention, focus, task completion, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>Areas LITERAL:</strong> No "(e.g., ...)" expansions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>NO unauthorized categories:</strong> Table categories only for areas in PLAAFP</span>
              </li>
            </ul>
          </div>
          
          {/* QUICK CHECKS */}
          <div className="bg-yellow-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">⚡ Quick Manual Checks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <input type="checkbox" id="check1" className="mr-2" />
                <label htmlFor="check1">PLAAFP uses ONLY data from input (no invented %)</label>
              </li>
              <li>
                <input type="checkbox" id="check2" className="mr-2" />
                <label htmlFor="check2">No Functional paragraph if no trigger words</label>
              </li>
              <li>
                <input type="checkbox" id="check3" className="mr-2" />
                <label htmlFor="check3">Areas of Concern matches input exactly</label>
              </li>
              <li>
                <input type="checkbox" id="check4" className="mr-2" />
                <label htmlFor="check4">Accommodation categories only for PLAAFP areas</label>
              </li>
              <li>
                <input type="checkbox" id="check5" className="mr-2" />
                <label htmlFor="check5">Only 1 goal if only 1 area mentioned</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

