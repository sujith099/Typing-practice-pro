import Link from 'next/link';
import { ArrowRight, Code, FileText, Zap, Shield, Layers, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TypeScript2PreviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-4">
                <Star className="h-3 w-3 mr-1" />
                TypeScript 2.0 Release Preview
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                TypeScript 2.0: Revolutionary Features
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover the groundbreaking features and improvements in TypeScript 2.0 that transform how you write, maintain, and scale JavaScript applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5">
                Explore Features
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Game-Changing Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              TypeScript 2.0 introduces powerful new capabilities that enhance type safety, improve developer experience, and enable better code organization.
            </p>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-blue-600" />
                <CardTitle>Non-nullable Types</CardTitle>
                <CardDescription>
                  Eliminate null and undefined errors at compile time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  With strict null checks, TypeScript 2.0 prevents the billion-dollar mistake of null reference exceptions.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// TypeScript 2.0</div>
                  <div>let name: string = "John";</div>
                  <div className="text-red-500">// Error: Type 'null' is not assignable</div>
                  <div>name = null; // ❌</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <Code className="h-8 w-8 mb-2 text-green-600" />
                <CardTitle>Control Flow Analysis</CardTitle>
                <CardDescription>
                  Smarter type narrowing based on code flow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  TypeScript now understands your code flow and automatically narrows types based on conditions.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// Automatic type narrowing</div>
                  <div>if (typeof x === "string") &#123;</div>
                  <div className="ml-4">x.toUpperCase(); // ✅ string</div>
                  <div>&#125;</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <Layers className="h-8 w-8 mb-2 text-purple-600" />
                <CardTitle>Tagged Union Types</CardTitle>
                <CardDescription>
                  Discriminated unions for better pattern matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create type-safe state machines and handle complex data structures with confidence.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// Discriminated unions</div>
                  <div>type Shape = Circle | Square;</div>
                  <div>// Perfect type safety!</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-orange-600" />
                <CardTitle>Readonly Properties</CardTitle>
                <CardDescription>
                  Immutable object properties and arrays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enforce immutability at the type level with readonly modifiers and ReadonlyArray type.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// Immutable by design</div>
                  <div>readonly name: string;</div>
                  <div>ReadonlyArray&lt;number&gt;</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800">
              <CardHeader>
                <Zap className="h-8 w-8 mb-2 text-red-600" />
                <CardTitle>Never Type</CardTitle>
                <CardDescription>
                  Represent values that never occur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The never type represents the type of values that never occur, perfect for exhaustive checking.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// Exhaustive checking</div>
                  <div>function assertNever(x: never): never &#123;</div>
                  <div className="ml-4">throw new Error();</div>
                  <div>&#125;</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal-200 dark:border-teal-800">
              <CardHeader>
                <CheckCircle className="h-8 w-8 mb-2 text-teal-600" />
                <CardTitle>Optional Chaining</CardTitle>
                <CardDescription>
                  Safe property access with optional chaining
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access nested object properties safely without verbose null checking.
                </p>
                <div className="bg-muted p-3 rounded-md text-sm font-mono">
                  <div className="text-green-600">// Safe navigation</div>
                  <div>user?.profile?.avatar?.url</div>
                  <div className="text-green-600">// No more crashes!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Development Workflow Impact
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              See how TypeScript 2.0 features transform your daily development experience.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Enhanced Type Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Before TypeScript 2.0:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Runtime null/undefined errors</li>
                    <li>• Manual null checking everywhere</li>
                    <li>• Uncertain object property access</li>
                    <li>• Type assertions without guarantees</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">With TypeScript 2.0:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ✅ Compile-time null safety</li>
                    <li>• ✅ Automatic type narrowing</li>
                    <li>• ✅ Safe property access</li>
                    <li>• ✅ Guaranteed type correctness</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Developer Productivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Productivity Gains:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• ⚡ 40% fewer runtime errors</li>
                    <li>• ⚡ Better IDE autocomplete</li>
                    <li>• ⚡ Faster refactoring with confidence</li>
                    <li>• ⚡ Reduced debugging time</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Code Quality:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 📈 More maintainable codebases</li>
                    <li>• 📈 Self-documenting type contracts</li>
                    <li>• 📈 Easier onboarding for new developers</li>
                    <li>• 📈 Reduced technical debt</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Migration Path
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Upgrade to TypeScript 2.0 with confidence using our step-by-step migration guide.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Smooth Migration Strategy</CardTitle>
                <CardDescription>
                  Follow these steps to migrate your existing TypeScript projects to 2.0
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">1</span>
                      Enable Strict Null Checks
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Gradually enable strict null checks in your tsconfig.json to catch potential null/undefined issues.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">2</span>
                      Update Type Definitions
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Review and update your type definitions to leverage new union types and readonly modifiers.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">3</span>
                      Refactor with Control Flow
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Take advantage of improved control flow analysis to simplify your type guards and assertions.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">4</span>
                      Test & Validate
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Run comprehensive tests to ensure your application works correctly with the new type system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Experience TypeScript 2.0?
              </h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed">
                Start building more reliable, maintainable applications with TypeScript 2.0's powerful new features.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary">
                Download TypeScript 2.0
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Release Notes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}