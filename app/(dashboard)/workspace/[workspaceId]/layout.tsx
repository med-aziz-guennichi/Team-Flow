import React from 'react'
import { WorkspaceHeader } from './_components/workspace-header'
import { CreateNewChannel } from './_components/create-new-channel'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ChannelList } from './_components/channel-list'
import { WorkspaceMembersList } from './_components/worspace-members-list'
import { getQueryClient, HydrateClient } from '@/lib/query/hydration'
import { orpc } from '@/lib/orpc'

type Props = {
  children: React.ReactNode
}

const ChannelListLayout = async ({ children }: Props) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.channel.list.queryOptions());
  return (
    <>
      <div className='flex h-full w-80 flex-col bg-secondary border-r border-border'>
        {/* Header */}
        <div className='flex items-center px-4 h-14 border-b border-border'>
          <HydrateClient client={queryClient}>
            <WorkspaceHeader />
          </HydrateClient>
        </div>

        <div className='px-4 py-2'>
          <CreateNewChannel />
        </div>

        {/* Channel List */}
        <div className='flex-1 overflow-y-auto px-4'>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className='flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180'>
              Main
              <ChevronDown className='size-4 transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <HydrateClient client={queryClient}>
                <ChannelList />
              </HydrateClient>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Members List */}
        <div className='px-4 py-2 border-t border-border'>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className='flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180'>
              Members
              <ChevronUp className='size-4 transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <HydrateClient client={queryClient}>
                <WorkspaceMembersList />
              </HydrateClient>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  )
}

export default ChannelListLayout
